"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Home } from "lucide-react";
import styles from "./ManageProfile.module.css";

interface Device {
  id: string;
  name: string;
  browser?: string;
  os?: string;
  lastUsed: string;
  isActive: boolean;
  isPreferred: boolean;
}

export default function ManageProfile() {
  const [activeTab, setActiveTab] = useState<"notifications" | "linked-devices">("notifications");
  const [notificationMethod, setNotificationMethod] = useState<"email" | "sms">("email");
  const [isEditMode, setIsEditMode] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  
  const [devices, setDevices] = useState<Device[]>([
    {
      id: "1",
      name: 'MacBook Pro 16"',
      browser: "Chrome (v122)",
      lastUsed: "Now",
      isActive: true,
      isPreferred: false,
    },
    {
      id: "2",
      name: "iPhone 14 Pro MAX",
      os: "iOS 17.3",
      lastUsed: "24-03-2026, 07:30am",
      isActive: false,
      isPreferred: true,
    },
    {
      id: "3",
      name: "Windows PC",
      browser: "Firefox (v121)",
      os: "Windows 11",
      lastUsed: "24-03-2026, 12:45pm",
      isActive: false,
      isPreferred: false,
    },
  ]);
  
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  const handleChangeSettings = () => {
    if (isEditMode) {
      // Save changes and exit edit mode
      setIsEditMode(false);
      setSuccessMessage("Notification preferences changed successfully");
      setShowSuccessMessage(true);
      // Here you can add API call to save the notification preference
      console.log("Saved notification method:", notificationMethod);
    } else {
      // Enter edit mode
      setIsEditMode(true);
    }
  };

  const handleCancel = () => {
    setIsEditMode(false);
    // Reset to original value if needed
  };

  const toggleDeviceSelection = (deviceId: string) => {
    const device = devices.find((d) => d.id === deviceId);
    // Don't allow selection of active device
    if (device?.isActive) return;
    
    setSelectedDevices((prev) =>
      prev.includes(deviceId)
        ? prev.filter((id) => id !== deviceId)
        : [...prev, deviceId]
    );
  };

  const handleRemoveSelectedDevices = () => {
    if (selectedDevices.length === 0) return;
    
    setDevices((prev) => prev.filter((device) => !selectedDevices.includes(device.id)));
    setSelectedDevices([]);
    setSuccessMessage("Device removed successfully");
    setShowSuccessMessage(true);
  };

  const handleRemoveSingleDevice = (deviceId: string) => {
    setDevices((prev) => prev.filter((device) => device.id !== deviceId));
    setSuccessMessage("Device removed successfully");
    setShowSuccessMessage(true);
  };

  const activeDevices = devices.filter((d) => d.isActive);
  const otherDevices = devices.filter((d) => !d.isActive);

  return (
    <div className={styles.container}>
      {/* Success Notification Snackbar */}
      {showSuccessMessage && (
        <div className={styles.successSnackbar}>
          <div className={styles.snackbarContent}>
            <Image
              src="/assets/images/icons/icn_check_circle_white.svg"
              alt="Success"
              width={24}
              height={24}
            />
            <span className={styles.snackbarText}>
              {successMessage}
            </span>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.breadcrumbs}>
            <Link href="/dashboard" className={styles.breadcrumbLink}>
              <Home className={styles.homeIcon} />
              Dashboard
            </Link>
            <span className={styles.breadcrumbSeparator}>&gt;</span>
            <span className={styles.breadcrumbCurrent}>Manage Profile</span>
          </div>
          <h1 className={styles.title}>Manage Profile</h1>
          <p className={styles.subtitle}>Set notification preferences and manage linked devices</p>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "notifications" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("notifications")}
          >
            Notifications
          </button>
          <button
            className={`${styles.tab} ${activeTab === "linked-devices" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("linked-devices")}
          >
            Linked Devices
          </button>
        </div>

        {/* Notifications Tab Content */}
        {activeTab === "notifications" && (
          <div className={styles.content}>
            <h2 className={styles.sectionTitle}>
              Select how you want to receive security notifications
            </h2>

            <div className={styles.notificationOptions}>
              {/* Email Option */}
              <label className={`${styles.radioOption} ${!isEditMode ? styles.disabled : ""}`}>
                <input
                  type="radio"
                  name="notification-method"
                  value="email"
                  checked={notificationMethod === "email"}
                  onChange={() => setNotificationMethod("email")}
                  disabled={!isEditMode}
                  className={styles.radioInput}
                />
                <div className={styles.radioContent}>
                  <div className={styles.iconWrapper}>
                    <Image
                      src="/assets/images/icons/icn_mail_gray.svg"
                      alt="Email"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className={styles.textContent}>
                    <div className={styles.methodLabel}>Email</div>
                    <div className={styles.methodValue}>robat.marais@abcarchitects.co.za</div>
                  </div>
                </div>
              </label>

              {/* SMS Option */}
              <label className={`${styles.radioOption} ${!isEditMode ? styles.disabled : ""}`}>
                <input
                  type="radio"
                  name="notification-method"
                  value="sms"
                  checked={notificationMethod === "sms"}
                  onChange={() => setNotificationMethod("sms")}
                  disabled={!isEditMode}
                  className={styles.radioInput}
                />
                <div className={styles.radioContent}>
                  <div className={styles.iconWrapper}>
                    <Image
                      src="/assets/images/icons/icn_phone_sms.svg"
                      alt="SMS"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className={styles.textContent}>
                    <div className={styles.methodLabel}>SMS</div>
                    <div className={styles.methodValue}>+27 082 123 4567</div>
                  </div>
                </div>
              </label>
            </div>

            {/* Action Buttons */}
            <div className={styles.buttonContainer}>
              {isEditMode && (
                <button 
                  className={styles.cancelButton}
                  onClick={handleCancel}
                >
                  CANCEL
                </button>
              )}
              <button 
                className={styles.changeSettingsButton}
                onClick={handleChangeSettings}
              >
                {isEditMode ? "SAVE CHANGES" : "CHANGE SETTINGS"}
                <Image
                  src="/assets/images/icons/icn_pencil.svg"
                  alt="Edit"
                  width={20}
                  height={20}
                  className={styles.pencilIcon}
                />
              </button>
            </div>
          </div>
        )}

        {/* Linked Devices Tab Content */}
        {activeTab === "linked-devices" && (
          <div className={styles.content}>
            <h2 className={styles.sectionTitle}>Profile linked to the following devices</h2>

            {/* Active Sessions */}
            {activeDevices.length > 0 && (
              <div className={styles.deviceSection}>
                <h3 className={styles.deviceSectionTitle}>ACTIVE SESSIONS</h3>
                {activeDevices.map((device) => {
                  const isSelected = selectedDevices.includes(device.id);
                  const isDisabled = device.isActive;
                  const isMobile = device.name.includes("iPhone");
                  
                  return (
                    <div key={device.id} className={`${styles.deviceRow} ${isDisabled ? styles.disabledRow : ""}`}>
                      <div className={styles.deviceCell}>
                        <input
                          type="checkbox"
                          id={`device-${device.id}`}
                          checked={isSelected}
                          onChange={() => toggleDeviceSelection(device.id)}
                          disabled={isDisabled}
                          className={styles.checkbox}
                        />
                      </div>
                      <div className={styles.deviceCell}>
                        <Image
                          src={
                            isMobile
                              ? "/assets/images/icons/icn_phone_iphone.svg"
                              : isSelected
                              ? "/assets/images/icons/icn_laptop.svg"
                              : "/assets/images/icons/icn_laptop_gray.svg"
                          }
                          alt={isMobile ? "Mobile" : "Laptop"}
                          width={24}
                          height={24}
                        />
                      </div>
                      <div className={`${styles.deviceCell} ${styles.deviceInfoCell}`}>
                        <div className={styles.deviceName}>
                          {device.name} - {device.browser}
                        </div>
                      </div>
                      <div className={styles.deviceCell}>
                        <div className={styles.deviceLastUsed}>
                          Last used on: {device.lastUsed}
                        </div>
                      </div>
                      <div className={styles.deviceCell}>
                        <button
                          className={styles.deleteButton}
                          onClick={() => handleRemoveSingleDevice(device.id)}
                          disabled={isDisabled}
                          aria-label="Remove device"
                        >
                          <Image
                            src={
                              isSelected
                                ? "/assets/images/icons/icn_bin.svg"
                                : "/assets/images/icons/icn_bin_gray.svg"
                            }
                            alt="Delete"
                            width={24}
                            height={24}
                          />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Other Linked Devices */}
            {otherDevices.length > 0 && (
              <div className={styles.deviceSection}>
                <h3 className={styles.deviceSectionTitle}>OTHER LINKED DEVICES</h3>
                {otherDevices.map((device) => {
                  const isSelected = selectedDevices.includes(device.id);
                  const isMobile = device.name.includes("iPhone");
                  
                  return (
                    <div key={device.id} className={styles.deviceRow}>
                      <div className={styles.deviceCell}>
                        <input
                          type="checkbox"
                          id={`device-${device.id}`}
                          checked={isSelected}
                          onChange={() => toggleDeviceSelection(device.id)}
                          className={styles.checkbox}
                        />
                      </div>
                      <div className={styles.deviceCell}>
                        <Image
                          src={
                            isMobile
                              ? "/assets/images/icons/icn_phone_iphone.svg"
                              : isSelected
                              ? "/assets/images/icons/icn_laptop.svg"
                              : "/assets/images/icons/icn_laptop_gray.svg"
                          }
                          alt={isMobile ? "Mobile" : "Laptop"}
                          width={24}
                          height={24}
                        />
                      </div>
                      <div className={`${styles.deviceCell} ${styles.deviceInfoCell}`}>
                        <div className={styles.deviceName}>
                          {device.name}
                          {device.browser && `, ${device.browser}`}
                          {device.os && `, ${device.os}`}
                        </div>
                      </div>
                      <div className={styles.deviceCell}>
                        <div className={styles.deviceLastUsed}>
                          Last used on: {device.lastUsed}
                        </div>
                        {device.isPreferred && (
                          <div className={styles.preferredBadge}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8 2l1.5 4.5H14l-3.75 3 1.5 4.5L8 11l-3.75 3 1.5-4.5-3.75-3h4.5L8 2z" fill="white"/>
                            </svg>
                            PREFERRED
                          </div>
                        )}
                      </div>
                      <div className={styles.deviceCell}>
                        <button
                          className={styles.deleteButton}
                          onClick={() => handleRemoveSingleDevice(device.id)}
                          aria-label="Remove device"
                        >
                          <Image
                            src={
                              isSelected
                                ? "/assets/images/icons/icn_bin.svg"
                                : "/assets/images/icons/icn_bin_gray.svg"
                            }
                            alt="Delete"
                            width={24}
                            height={24}
                          />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* No devices message */}
            {devices.length === 0 && (
              <p className={styles.placeholderText}>
                No linked devices found. Link a device to manage it here.
              </p>
            )}

            {/* Bottom message and button */}
            {devices.length > 0 && (
              <div className={styles.devicesFooter}>
                <p className={styles.securityMessage}>
                  Don&apos;t recognise any of them? Remove them to secure your profile
                </p>
                <button
                  className={styles.removeDevicesButton}
                  onClick={handleRemoveSelectedDevices}
                  disabled={selectedDevices.length === 0}
                >
                  REMOVE SELECTED DEVICES
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
