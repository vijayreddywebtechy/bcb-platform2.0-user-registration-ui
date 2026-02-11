"use client";

import { useState } from "react";
import AuthLayout from "../shared/AuthLayout";
import AuthCard from "../shared/AuthCard";
import AuthHeader from "../shared/AuthHeader";
import AuthActions from "../AuthActions";

export default function InviteForm() {
  const [emails, setEmails] = useState<string[]>([""]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const addEmailField = () => {
    setEmails([...emails, ""]);
  };

  const removeEmailField = (index: number) => {
    if (emails.length > 1) {
      const newEmails = emails.filter((_, i) => i !== index);
      setEmails(newEmails);
    }
  };

  const updateEmail = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validEmails = emails.filter(email => email.trim() !== "");
    if (validEmails.length === 0) {
      alert("Please enter at least one email address");
      return;
    }
    setLoading(true);
    // Add your invite logic here
    console.log("Inviting:", validEmails, "Message:", message);
    setTimeout(() => {
      setLoading(false);
      alert(`Invitations sent to ${validEmails.length} user(s)`);
    }, 2000);
  };

  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader 
          title="Invite Users" 
          subtitle="Invite team members to join BizHub" 
        />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Email Addresses
            </label>
            {emails.map((email, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => updateEmail(index, e.target.value)}
                  placeholder={`user${index + 1}@example.com`}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required={index === 0}
                />
                {emails.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEmailField(index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addEmailField}
              className="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-all font-medium"
            >
              + Add Another Email
            </button>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Personal Message (Optional)
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a personal message to your invitation..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Invitation Details</p>
                <p>Recipients will receive an email with a secure link to create their account and join your organization.</p>
              </div>
            </div>
          </div>

          <AuthActions
            primaryText={`Send ${emails.filter(e => e.trim()).length} Invitation${emails.filter(e => e.trim()).length !== 1 ? 's' : ''}`}
            loading={loading}
          />

          <div className="text-center text-sm text-gray-600">
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
              View pending invitations
            </a>
          </div>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
