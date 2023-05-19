import React from "react";
import { UserLines } from "../Svgs/UserLines";
import { ShieldIcon } from "../Svgs/ShieldIcon";
import { PaymentIcon } from "../Svgs/PaymentIcon";
import { PreferencesIcon } from "../Svgs/PreferencesIcon";

const AccountSettingsGrid = () => {
  return (
    <div className="w-full grid grid-cols-4 gap-4">
      <div className="w-full bg-white p-5 inline-block rounded-lg shadow-lg">
        <UserLines size={10} />
        <h3 className="text-lg font-bold">Personnal Data</h3>
        <p className="text-sm font-light">
          Informations about you like your name, company, contacts, adress,
          etc...
        </p>
      </div>
      <div className="w-full bg-white p-5 inline-block rounded-lg shadow-lg">
        <ShieldIcon size={10} />
        <h3 className="text-lg font-bold">Security</h3>
        <p className="text-sm font-light">
          Manage your account security. We mean password, email, 2FA and more...
        </p>
      </div>
      <div className="w-full bg-white p-5 inline-block rounded-lg shadow-lg">
        <PaymentIcon size={10} />
        <h3 className="text-lg font-bold">Payment Options</h3>
        <p className="text-sm font-light">
          Set or manage your payment options; Your bank account, mobile payment,
          etc...
        </p>
      </div>
      <div className="w-full bg-white p-5 inline-block rounded-lg shadow-lg">
        <PreferencesIcon size={10} />
        <h3 className="text-lg font-bold">Preferences</h3>
        <p className="text-sm font-light">
          Language preferences, currency, timezone...
        </p>
      </div>
    </div>
  );
};

export { AccountSettingsGrid };
