import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Home,
  ImagePlus,
  Loader2,
  Upload,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { IssueIcon } from "../components/IssueIcon";
import { useSubmitIssue } from "../hooks/useQueries";

const issueTypes = ["Pothole", "Garbage", "Streetlight", "Water Leak"];

export function ReportIssuePage() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate, isPending, isSuccess, isError } = useSubmitIssue();

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setPhoto(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
    } else {
      setPhotoPreview(null);
    }
  };

  const removePhoto = () => {
    setPhoto(null);
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ name, location, issueType, description, photo });
  };

  if (isSuccess) {
    return (
      <main className="min-h-[80vh] flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          data-ocid="report.success_state"
          className="text-center max-w-md mx-auto px-6"
        >
          <div className="flex justify-center mb-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 border-4 border-emerald-100">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>
          </div>
          <h2 className="font-display text-3xl font-bold text-foreground mb-3">
            Issue Reported Successfully!
          </h2>
          <p className="text-muted-foreground mb-8">
            Thank you for reporting. Your issue has been submitted and local
            authorities have been notified. We'll keep you updated on progress.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/">
              <Button variant="outline" className="gap-2 w-full sm:w-auto">
                <Home className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <Link to="/issues">
              <Button className="gap-2 w-full sm:w-auto">
                View All Issues
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="bg-background py-12">
      <div className="container max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link to="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground">Report Issue</span>
            </div>
            <h1 className="font-display text-4xl font-bold text-foreground mb-2">
              Report an Issue
            </h1>
            <p className="text-muted-foreground">
              Fill in the details below. The more information you provide, the
              faster it gets resolved.
            </p>
          </div>

          <Card className="shadow-card border-border/60">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Jane Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    data-ocid="report.name_input"
                    className="h-11"
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-medium">
                    Location
                  </Label>
                  <Input
                    id="location"
                    placeholder="e.g. 42 Elm Street, Downtown"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    data-ocid="report.location_input"
                    className="h-11"
                  />
                </div>

                {/* Issue Type */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Issue Type</Label>
                  <Select
                    value={issueType}
                    onValueChange={setIssueType}
                    required
                  >
                    <SelectTrigger
                      data-ocid="report.issue_type_select"
                      className="h-11"
                    >
                      <SelectValue placeholder="Select issue type..." />
                    </SelectTrigger>
                    <SelectContent>
                      {issueTypes.map((t) => (
                        <SelectItem key={t} value={t}>
                          <div className="flex items-center gap-2">
                            <IssueIcon issueType={t} size="sm" />
                            {t}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the issue in detail. Include size, severity, and any safety concerns..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={4}
                    data-ocid="report.description_textarea"
                    className="resize-none"
                  />
                </div>

                {/* Photo Upload */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Photo (Optional)
                  </Label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                    id="photo-upload"
                  />
                  {photoPreview ? (
                    <div className="relative rounded-xl overflow-hidden border border-border">
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-full h-48 object-cover"
                      />
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-foreground/80 text-background hover:bg-foreground transition-colors"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="photo-upload"
                      data-ocid="report.upload_button"
                      className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-border hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer py-8"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                        <ImagePlus className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-foreground">
                          Upload a photo
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          PNG, JPG up to 10MB
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="gap-2 pointer-events-none"
                      >
                        <Upload className="h-3.5 w-3.5" />
                        Choose File
                      </Button>
                    </label>
                  )}
                </div>

                {isError && (
                  <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
                    Failed to submit issue. Please try again.
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={
                    isPending ||
                    !name ||
                    !location ||
                    !issueType ||
                    !description
                  }
                  data-ocid="report.submit_button"
                  className="w-full h-12 text-base font-semibold gap-2"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Report
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}
