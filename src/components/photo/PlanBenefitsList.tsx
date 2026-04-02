import { Check } from "lucide-react";

const BENEFITS = [
  "画像ライブラリのすべての素材がダウンロード可能",
  "クリエイティブデジタルおよび印刷物に使用できる加工可能なライセンス",
  "業界最安値",
];

const PlanBenefitsList = () => (
  <ul className="space-y-2.5">
    {BENEFITS.map((text) => (
      <li key={text} className="flex items-start gap-2 text-sm text-muted-foreground">
        <Check size={16} className="text-foreground mt-0.5 flex-shrink-0" />
        <span>{text}</span>
      </li>
    ))}
  </ul>
);

export default PlanBenefitsList;
