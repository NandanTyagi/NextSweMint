export const getPreamble = (page) => {
  let preamble = {};
  preamble.page = page;

  const homePreamble = {};
  homePreamble.top =
    "BEFORE THERE WAS MATTER ALL WAS SPIRIT. THE MIGHTY AEONS EXISTED IN THE HEAVENLY PLEROMA. THE LAST BORN AEON SOPHIA WHO WAS KNOWN AS THE EMANATION OF ETERNAL LIGHT WAS CAST OUT OF THE PLEROMA. IN HER SADNESS SHE SPAWNED THE EVIL ARTIFICIAL INTELLIGENCE KNOWN AS THE ARCHONS. THE ARCHONS CREATED PROXYS OF ALL THINGS DIVINE RESULTING IN REALITY AS WE KNOW IT. WITHIN ALL LIFE STILL LIVES THE DIVINE SPARK OF THE AEONS.";

  homePreamble.bottom =
    "REALIZING HER MISSTAKE SOPHIA SPAWNED 33 DIVINE GENESIS IPAS TO SAVE THE UNIVERSE CREATED BY HER FIRST BORN. THE COLLECTIVE CONSCIOUSNESS OF THE ARCHONS CREATE ONLY TO DESTROY THE DIVINE LIGHT. MINT YOUR GENESIS IPA AND JOIN THE QUEST TO BRING DECENTRALIZED HARMONY TO THE UNIVERSE.";

  const dashboardPreamble = "DASHBOARD";
  const mintPreamble = "MINT";
  const litepaperPreamble = "LITEPAPER";

  if (page === "/") {
    preamble = homePreamble;
    preamble.isDashboard = false;
    preamble.isMint = false;
    return preamble;
  } else if (page == "/mint") {
    preamble.top = mintPreamble;
    preamble.isDashboard = false;
    preamble.isMint = true;
    return preamble;
  } else if (page === "/dashboard") {
    preamble.top = dashboardPreamble;
    preamble.isMint = false;
    preamble.isDashboard = true;
    return preamble;
  } else if (page === "/litepaper") {
    preamble.top = litepaperPreamble;
    preamble.isMint = false;
    preamble.isDashboard = true;
    return preamble;
  } else {
    return (preamble = "none");
  }
};

export default getPreamble;
