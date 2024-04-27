import React from "react";
import CustomForm from "./form";

const HomeContainer = () => {
  return (
    <main>
      <section>
        <h2 className="text-2xl text-center my-10">
          Welcome to PDF {'->'} QR Generator
        </h2>
      </section>

      <section className="px-2">
            <CustomForm/>
      </section>

    </main>
  );
};

export default HomeContainer;
