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
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl p-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  s <= step
                    ? "border-accent bg-accent text-white"
                    : "border-gray-300 text-gray-400"
                }`}
              >
                {s}
              </div>
              <span
                className={`mt-2 text-sm ${
                  s <= step ? "text-accent" : "text-gray-400"
                }`}
              >
                {s === 1
                  ? "Kontakt"
                  : s === 2
                  ? "Unternehmen"
                  : "Bestätigung"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Dein Name
              </label>
              <Input
                placeholder="Max Mustermann"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Deine E-Mail
              </label>
              <Input
                placeholder="max@musterfirma.de"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Deine Telefonnummer
              </label>
              <Input
                placeholder="+49 123 456789"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Dein Unternehmen
              </label>
              <Input
                placeholder="Musterfirma GmbH"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-lg font-medium text-gray-900 text-center">
              Deine Angaben
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">E-Mail:</span>
                <span className="font-medium">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Telefon:</span>
                <span className="font-medium">{formData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Unternehmen:</span>
                <span className="font-medium">{formData.company}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8 pt-4 border-t border-gray-100">
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="px-6"
            >
              Zurück
            </Button>
          )}
          {step < 3 ? (
            <Button
              type="button"
              onClick={nextStep}
              className={`px-6 bg-accent hover:bg-accent-light text-primary-dark ${
                step === 1 ? "ml-auto" : ""
              }`}
            >
              Weiter
            </Button>
          ) : (
            <Button
              type="submit"
              className="px-6 bg-accent hover:bg-accent-light text-primary-dark ml-auto"
            >
              Absenden
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};