import { useEffect, useRef, useState } from "react";
import { useAuth } from "./../../../contexts/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState({
    name: user?.name || " sofiya aysin",
    email: user?.email || " sofiyasin190@gmail.com",
    age: "22",
    height: "157",
    currentWeight: "53",
    targetWeight: "50",
    activityLevel: "moderate",
    fitnessGoal: "weight-loss",
    bio: "Passionate about fitness and healthy living!",
    photo: "/sofi.png", 
  });

  useEffect(() => {
    if (user) {
      setProfile((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
      }));
    }
  }, [user]);

  const handleSave = async () => {
    setIsSaving(true);
    setMessage("");

    try {
      // simulate save API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessage("✅ Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      setMessage("❌ Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  // Handle image upload & preview
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div id="ProfilePage" className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal information and preferences
          </p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`px-4 py-2 rounded-md transition-colors ${
            isEditing
              ? "border border-border hover:bg-muted"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className="p-4 border rounded-md bg-muted">
          <p className="text-sm">{message}</p>
        </div>
      )}

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Picture */}
        <div className="bg-card rounded-lg border">
          <div className="p-3">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Profile Picture
            </h3>
          </div>
          <div className="px-6 pb-6 flex flex-col items-center space-y-4">
            <div className="relative h-32 w-32 rounded-full overflow-hidden bg-gradient-to-br from-primary to-secondary">
              <img
                src={profile.photo}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {isEditing && (
              <>
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="inline-flex items-center px-3 py-2 border border-border rounded-md hover:cursor-pointer bg-muted transition-colors text-sm"
                >
                  <svg
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Change Photo
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </>
            )}
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-card rounded-lg border lg:col-span-2">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Personal Information
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Update your personal details
            </p>

            <div className="grid grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground">
                  Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="mt-1 block w-full rounded-md border border-border bg-background p-2 text-foreground"
                  />
                ) : (
                  <p className="mt-1 text-foreground">{profile.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="mt-1 block w-full rounded-md border border-border bg-background p-2 text-foreground"
                  />
                ) : (
                  <p className="mt-1 text-foreground">{profile.email}</p>
                )}
             
                
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground">
                  Age
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    value={profile.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    className="mt-1 block w-full rounded-md border border-border bg-background p-2 text-foreground"
                  />
                ) : (
                  <p className="mt-1 text-foreground">{profile.age}</p>
                )}
              </div>

              {/* Height */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground">
                  Height (cm)
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    value={profile.height}
                    onChange={(e) =>
                      handleInputChange("height", e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border border-border bg-background p-2 text-foreground"
                  />
                ) : (
                  <p className="mt-1 text-foreground">{profile.height}</p>
                )}
              </div>

              {/* Current Weight */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground">
                  Current Weight (kg)
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    value={profile.currentWeight}
                    onChange={(e) =>
                      handleInputChange("currentWeight", e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border border-border bg-background p-2 text-foreground"
                  />
                ) : (
                  <p className="mt-1 text-foreground">
                    {profile.currentWeight}
                  </p>
                )}
              </div>

              {/* Target Weight */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground">
                  Target Weight (kg)
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    value={profile.targetWeight}
                    onChange={(e) =>
                      handleInputChange("targetWeight", e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border border-border bg-background p-2 text-foreground"
                  />
                ) : (
                  <p className="mt-1 text-foreground">
                    {profile.targetWeight}
                  </p>
                )}
              </div>
            </div>

            {/* Bio */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-muted-foreground">
                Bio
              </label>
              {isEditing ? (
                <textarea
                  value={profile.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  className="mt-1 block w-full rounded-md border border-border bg-background p-2 text-foreground"
                  rows="3"
                />
              ) : (
                <p className="mt-1 text-foreground">{profile.bio}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors inline-flex items-center"
          >
            {isSaving ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                Saving...
              </>
            ) : (
              <>
                <svg
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                Save Changes
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
