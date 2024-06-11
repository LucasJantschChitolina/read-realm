import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import { HeroSection } from "@/components/layout/hero";
import { FeaturesSection } from "@/components/layout/features";
import { BenefitsSection } from "@/components/layout/benefits";
import { TestimonialSection } from "@/components/layout/testimonials";
import { FAQSection } from "@/components/layout/faq";
import { PricingSection } from "@/components/layout/pricing";

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/feed");
  }

  return (
    <div className="flex flex-col">
      <HeroSection />
      <BenefitsSection />
      <FeaturesSection />
      <TestimonialSection />
      <PricingSection />
      <FAQSection />
    </div>
  );
}
