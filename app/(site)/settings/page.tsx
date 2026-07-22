"use client";

import SettingsLogin from "@/components/SettingsLogin";
import Sidebar from "@/components/Sidebar";
import { useAuthStore } from "@/stores/authStore";
import Link from "next/link";

export default function page() {
  const user = useAuthStore((s) => s.user);
  const subStatus = useAuthStore((s) => s.subscriptionStatus);

  return (
    <>
      <div className="wrapper">
        <Sidebar />
        <div className="container">
          <div className="row">
            <div className="section__title page__title">Settings</div>
            {!user ? <SettingsLogin page={"settings"} /> : <></>}
            {user && subStatus === "basic" ? (
              <>
                <div className="setting__content">
                  <div className="settings__sub--title">
                    Your Subscription plan
                  </div>
                  <div className="settings__text" style={{textTransform: "capitalize"}}>{subStatus}</div>
                  <Link
                    className="btn settings__upgrade--btn"
                    href="/choose-plan"
                  >
                    Upgrade to Premium
                  </Link>
                </div>
                <div className="setting__content">
                  <div className="setting__sub--title">Email</div>
                  <div className="settings__text">{user.email}</div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
