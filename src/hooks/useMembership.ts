import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FunctionsHttpError } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

function messageFromInvokePayload(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;
  const o = data as { message?: unknown; error?: unknown };
  if (typeof o.message === "string" && o.message.trim()) return o.message;
  if (typeof o.error === "string" && o.error.trim()) return o.error;
  return null;
}

async function readFunctionsErrorBody(error: FunctionsHttpError): Promise<unknown> {
  const res = error.context as Response | undefined;
  if (!res || typeof res.json !== "function") return null;
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export type MembershipTier = "free" | "plus";

/** Lemon Webhook / memberships.current_period_end の表示用（JST の暦日） */
export function formatPeriodEndJa(iso: string | null | undefined): string | null {
  if (iso == null || String(iso).trim() === "") return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Tokyo",
  }).format(d);
}

export interface MembershipPlan {
  tier: MembershipTier | null;
  status: string | null;
  current_period_end: string | null;
  current_period_start: string | null;
}

/** プラン表示・キャンセルモーダル用（Lemon 連携で更新される memberships） */
export function useMembershipPlan() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["membership-plan", user?.id],
    enabled: !!user,
    staleTime: 60 * 1000,
    queryFn: async (): Promise<MembershipPlan | null> => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("memberships")
        .select("tier, status, current_period_end, current_period_start")
        .eq("user_id", user.id)
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      return {
        tier: (data.tier as MembershipTier | null) ?? null,
        status: data.status ?? null,
        current_period_end: data.current_period_end ?? null,
        current_period_start: data.current_period_start ?? null,
      };
    },
  });
}

export function useMembershipTier() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["membership-tier", user?.id],
    enabled: !!user,
    staleTime: 60 * 1000,
    queryFn: async (): Promise<MembershipTier | null> => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("memberships")
        .select("tier")
        .eq("user_id", user.id)
        .maybeSingle();
      if (error) throw error;
      return (data?.tier as MembershipTier | null) ?? null;
    },
  });
}

/** Edge Function cancel-subscription（Lemon API + memberships 更新） */
export function useCancelSubscription() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (): Promise<{ success?: boolean; already_cancelled?: boolean }> => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      if (sessionError || !session?.access_token) {
        throw new Error("ログインが必要です");
      }

      const { data, error } = await supabase.functions.invoke("cancel-subscription", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (error instanceof FunctionsHttpError) {
        const body = await readFunctionsErrorBody(error);
        throw new Error(messageFromInvokePayload(body) ?? error.message);
      }
      if (error) {
        throw new Error(messageFromInvokePayload(data) ?? error.message);
      }

      const msg = messageFromInvokePayload(data);
      if (msg && data && typeof data === "object" && "error" in data) {
        throw new Error(msg);
      }

      return (data ?? {}) as { success?: boolean; already_cancelled?: boolean };
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ["membership-plan", user?.id] });
      void queryClient.invalidateQueries({ queryKey: ["membership-tier", user?.id] });
    },
  });
}

/** アカウント UI 用: Plus かつキャンセル済みは期間終了まで利用可ビュー */
export function derivePlanStatus(
  membershipTier: MembershipTier | null | undefined,
  membershipPlan: MembershipPlan | null | undefined,
): "free" | "plus" | "cancelled" {
  if (membershipPlan?.tier === "plus" && membershipPlan?.status === "cancelled") {
    return "cancelled";
  }
  if (membershipTier === "plus") return "plus";
  return "free";
}
