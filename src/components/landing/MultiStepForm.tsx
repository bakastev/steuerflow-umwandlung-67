import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

type FormStep = 1 | 2 | 3;

export const MultiStepForm = () => {
  const [step, setStep] = useState<FormStep>(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Anfrage gesendet",
      description: "Wir melden uns in Kürze bei Ihnen.",
    });
  };

  const nextStep = () => {
    setStep((prev) => (prev < 3 ? (prev + 1) as FormStep : prev));
  };

  const prevStep = () => {
    setStep((prev) => (prev > 1 ? (prev - 1) as FormStep : prev));
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="mb-8">
        <div className="flex justify-between mb-4">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-3 h-3 rounded-full ${
                s <= step ? "bg-accent" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <Input
              placeholder="Ihr Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <Input
              placeholder="Ihre E-Mail"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <Input
              placeholder="Ihre Telefonnummer"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            <Input
              placeholder="Ihr Unternehmen"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <p className="text-center text-gray-600">
              Bestätigen Sie Ihre Angaben:
            </p>
            <div className="space-y-2">
              <p>Name: {formData.name}</p>
              <p>E-Mail: {formData.email}</p>
              <p>Telefon: {formData.phone}</p>
              <p>Unternehmen: {formData.company}</p>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          {step > 1 && (
            <Button type="button" variant="outline" onClick={prevStep}>
              Zurück
            </Button>
          )}
          {step < 3 ? (
            <Button type="button" onClick={nextStep} className="ml-auto">
              Weiter
            </Button>
          ) : (
            <Button type="submit" className="ml-auto bg-accent hover:bg-accent-light text-primary-dark">
              Absenden
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};