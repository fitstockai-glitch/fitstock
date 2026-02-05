import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Pencil } from "lucide-react";

interface ProfileSectionProps {
  displayName: string;
  onSave: (name: string) => void;
}

const ProfileSection = ({ displayName, onSave }: ProfileSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(displayName);

  const handleSave = () => {
    onSave(editName);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(displayName);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">プロフィール編集</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              表示名
            </label>
            {isEditing ? (
              <div className="flex gap-2">
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="max-w-xs"
                />
                <Button onClick={handleSave} size="sm">
                  <Check size={16} className="mr-1" />
                  保存
                </Button>
                <Button onClick={handleCancel} variant="outline" size="sm">
                  キャンセル
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-foreground font-medium">{displayName}</span>
                <Button 
                  onClick={() => setIsEditing(true)} 
                  variant="ghost" 
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Pencil size={14} className="mr-1" />
                  編集
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;
