import React from "react";
import { Helmet } from "react-helmet";
import { ProfileMenu } from "../../../components/ProfileMenu/ProfileMenu";
import { ProfileSumCard } from "../../../components/ProfileSumCard/ProfileSumCard";
import { Footer } from "../../../components/Footer";
import { Overlay } from "../../../components/LoadingOverlay";

const Profile = () => {
  return (
    <div className="w-full bg-slate-200 pb-40">
      {<Overlay />}
      <Helmet>
        <title>Profile | Menzen</title>
      </Helmet>
      <div className="w-full py-5">
        <main className="my-14">
          <div className="container mx-auto px-6">
            <div className="w-full">
              <ProfileSumCard />
            </div>
            {/* <div className="w-full h-5" />
            <div className="w-full">
              <ProfileMenu />
            </div> */}
          </div>
        </main>
      </div>
      <div className="w-full pt-3 bg-gray-800 inset-x-0 bottom-0 absolute">
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
