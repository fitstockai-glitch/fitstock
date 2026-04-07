import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

const PlanBenefitsList = () => {
  const { t } = useTranslation();
  const benefits = [
    t("pricing.feature1"),
    t("pricing.feature2"),
    t("plan.feature3"),
  ];

  return (
    <ul className="space-y-2.5">
      {benefits.map((text) => (
        <li key={text} className="flex items-start gap-2 text-sm text-muted-foreground">
          <Check size={16} className="text-foreground mt-0.5 flex-shrink-0" />
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );
};

export default PlanBenefitsList;
