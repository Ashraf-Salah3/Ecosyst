import Head from "next/head";
import Landing from "@/components/Landing/Landing";
import OurServices from "@/components/ourServices/OurServices";
import OurPhilosophy from "@/components/ourPhilosophy/OurPhilosophy";
import AboutUsPage from "./aboutUs/page";
import LastWork from "@/components/LastWork/LastWork";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>
          Our Company | Cybersecurity, Web Development, UI/UX Training
        </title>
        <meta
          name="description"
          content="We provide cybersecurity training, frontend & backend development services, UI/UX design and more. Discover our philosophy, latest work, and expert services."
        />
        <meta
          name="keywords"
          content="Cybersecurity, Web Development, Frontend, Backend, UI/UX, IT Training, Tech Company"
        />
        <meta
          property="og:title"
          content="Our Company | Professional IT Services & Training"
        />
        <meta
          property="og:description"
          content="Leading provider of cybersecurity, UI/UX, and web development training and services."
        />
        <meta property="og:url" content="https://ecosyst.spiderscompany.com" />
        <meta property="og:image" content="../assets/logo.png" />
      </Head>

      <Landing />
      <AboutUsPage />
      <OurServices />
      <LastWork homepage />
      <OurPhilosophy />
    </>
  );
};

export default HomePage;
