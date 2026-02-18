"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import styles from "./CustomizeAppearanceModal.module.css";
import icnPaint from "@/assets/images/icons/icn_paint.svg";
import icnGraphBarArrow from "@/assets/images/icons/icn_graph_bar_arrow.svg";
import icnMoon from "@/assets/images/icons/icn_moon.svg";
import icnClick from "@/assets/images/icons/icn_click.svg";
import icnAccountTile from "@/assets/images/icons/icn_account_tile.svg";
import icnLinkOut from "@/assets/images/icons/icn_link_out.svg";
import icnDocumentMoney from "@/assets/images/icons/icn_document_money.svg";
import { useDashboardCustomization, CustomizationSettings } from "@/contexts/DashboardCustomizationContext";

interface CustomizeAppearanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomizeAppearanceModal({
  isOpen,
  onClose,
}: CustomizeAppearanceModalProps) {
  const { settings: globalSettings, updateSettings } = useDashboardCustomization();
  const [localSettings, setLocalSettings] = useState<CustomizationSettings>(globalSettings);

  // Sync local settings with global settings when modal opens
  useEffect(() => {
    if (isOpen) {
      setLocalSettings(globalSettings);
    }
  }, [isOpen, globalSettings]);

  const handleSave = () => {
    console.log("Saving customization settings:", localSettings);
    updateSettings(localSettings);
    onClose();
  };

  const handleCancel = () => {
    console.log("Customization cancelled");
    // Reset local settings to global settings
    setLocalSettings(globalSettings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className={styles.backdrop} onClick={handleCancel} />

      {/* Modal */}
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.iconWrapper}>
              <Image
                src={icnPaint}
                alt="Customize"
                width={24}
                height={24}
                className={styles.paintIcon}
              />
            </div>
            <div>
              <h2 className={styles.title}>Customize Appearance</h2>
              <p className={styles.subtitle}>Customize your dashboard experience</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleCancel}
            className={styles.closeButton}
            aria-label="Close"
          >
            <X className={styles.closeIcon} />
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Dark mode */}
          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <div className={styles.settingIcon}>
                <Image src={icnMoon} alt="Dark mode" width={20} height={20} />
              </div>
              <span className={styles.settingLabel}>Dark mode</span>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={localSettings.darkMode}
                onChange={(e) =>
                  setLocalSettings({ ...localSettings, darkMode: e.target.checked })
                }
              />
              <span className={styles.slider}></span>
            </label>
          </div>

          {/* Cash flows */}
          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <div className={styles.settingIcon}>
                <Image src={icnGraphBarArrow} alt="Cash flows" width={20} height={20} />
              </div>
              <span className={styles.settingLabel}>Cash flows</span>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={localSettings.cashFlows}
                onChange={(e) =>
                  setLocalSettings({ ...localSettings, cashFlows: e.target.checked })
                }
              />
              <span className={styles.slider}></span>
            </label>
          </div>

          {/* My links */}
          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <div className={styles.settingIcon}>
                <Image src={icnClick} alt="My links" width={20} height={20} />
              </div>
              <span className={styles.settingLabel}>My links</span>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={localSettings.myLinks.enabled}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    myLinks: { ...localSettings.myLinks, enabled: e.target.checked },
                  })
                }
              />
              <span className={styles.slider}></span>
            </label>
          </div>

          {/* My links sub-items */}
          {localSettings.myLinks.enabled && (
            <div className={styles.subItems}>
              <div className={styles.checkboxItem}>
                <Checkbox
                  id="documents"
                  checked={localSettings.myLinks.items.documents}
                  onCheckedChange={(checked) =>
                    setLocalSettings({
                      ...localSettings,
                      myLinks: {
                        ...localSettings.myLinks,
                        items: {
                          ...localSettings.myLinks.items,
                          documents: checked as boolean,
                        },
                      },
                    })
                  }
                />
                <Label htmlFor="documents" className={styles.checkboxLabel}>
                  Documents
                </Label>
              </div>
              <div className={styles.checkboxItem}>
                <Checkbox
                  id="queryTracker"
                  checked={localSettings.myLinks.items.queryTracker}
                  onCheckedChange={(checked) =>
                    setLocalSettings({
                      ...localSettings,
                      myLinks: {
                        ...localSettings.myLinks,
                        items: {
                          ...localSettings.myLinks.items,
                          queryTracker: checked as boolean,
                        },
                      },
                    })
                  }
                />
                <Label htmlFor="queryTracker" className={styles.checkboxLabel}>
                  Query tracker
                </Label>
              </div>
              <div className={styles.checkboxItem}>
                <Checkbox
                  id="helpCenter"
                  checked={localSettings.myLinks.items.helpCenter}
                  onCheckedChange={(checked) =>
                    setLocalSettings({
                      ...localSettings,
                      myLinks: {
                        ...localSettings.myLinks,
                        items: {
                          ...localSettings.myLinks.items,
                          helpCenter: checked as boolean,
                        },
                      },
                    })
                  }
                />
                <Label htmlFor="helpCenter" className={styles.checkboxLabel}>
                  help center
                </Label>
              </div>
              <div className={styles.checkboxItem}>
                <Checkbox
                  id="accounts"
                  checked={localSettings.myLinks.items.accounts}
                  onCheckedChange={(checked) =>
                    setLocalSettings({
                      ...localSettings,
                      myLinks: {
                        ...localSettings.myLinks,
                        items: {
                          ...localSettings.myLinks.items,
                          accounts: checked as boolean,
                        },
                      },
                    })
                  }
                />
                <Label htmlFor="accounts" className={styles.checkboxLabel}>
                  Accounts
                </Label>
              </div>
            </div>
          )}

          {/* Business accounts */}
          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <div className={styles.settingIcon}>
                <Image src={icnAccountTile} alt="Business accounts" width={20} height={20} />
              </div>
              <span className={styles.settingLabel}>Business accounts</span>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={localSettings.businessAccounts}
                onChange={(e) =>
                  setLocalSettings({ ...localSettings, businessAccounts: e.target.checked })
                }
              />
              <span className={styles.slider}></span>
            </label>
          </div>

          {/* Digital hub links */}
          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <div className={styles.settingIcon}>
                <Image src={icnLinkOut} alt="Digital hub links" width={20} height={20} />
              </div>
              <span className={styles.settingLabel}>Digital hub links</span>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={localSettings.digitalHubLinks}
                onChange={(e) =>
                  setLocalSettings({ ...localSettings, digitalHubLinks: e.target.checked })
                }
              />
              <span className={styles.slider}></span>
            </label>
          </div>

          {/* Formal statements */}
          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <div className={styles.settingIcon}>
                <Image src={icnDocumentMoney} alt="Formal statements" width={20} height={20} />
              </div>
              <span className={styles.settingLabel}>Formal statements</span>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={localSettings.formalStatements}
                onChange={(e) =>
                  setLocalSettings({ ...localSettings, formalStatements: e.target.checked })
                }
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <Button
            variant="outline"
            onClick={handleCancel}
            className={styles.cancelButton}
          >
            CANCEL
          </Button>
          <Button onClick={handleSave} className={styles.saveButton}>
            SAVE
          </Button>
        </div>
      </div>
    </>
  );
}
