import React, { useMemo, useState } from "react";
import { Bell, ChevronLeft, ChevronRight, MapPin, Search, Volume2, SunMedium, LocateFixed, Bookmark, Waves, CalendarDays, Compass, Info, AlertTriangle } from "lucide-react";

const COLORS = {
  bg: "#E9EEF2",
  phoneFrame: "#1A1D21",
  card: "#FFFFFF",
  text: "#1F3142",
  textMuted: "#607486",
  divider: "#E7ECF0",
  primary: "#0E5FB8",
  primaryDark: "#0B4E97",
  ocean: "#BFE3EE",
  oceanDeep: "#91C9DD",
  mapBase: "#EEF1F3",
  mapShadow: "#D8DEDE",
  greenZone: "#A6D08F",
  quietZone: "#4CB2AE",
  loudZone: "#E6C861",
  salmonZone: "#E58D65",
  kelpBlue: "#8BB9D7",
  routeBlue: "#1C6FE0",
  routeGreen: "#22A05F",
  alertBlue: "#1A4A9E",
  softBlue: "#E8F1FB",
  softGreen: "#E8F6EE",
  softOrange: "#FFF1E6",
};

const exhibits = [
  {
    id: "kelp",
    name: "Kelp Forest",
    x: 39,
    y: 24,
    walk: "5 min walk",
    desc: "Large underwater forest with fish, rays, and drifting kelp.",
    tags: ["Low Light", "Moderate Noise"],
    accent: COLORS.kelpBlue,
  },
  {
    id: "otter",
    name: "Sea Otter\nExhibit",
    x: 56,
    y: 51,
    walk: "3 min walk",
    desc: "Outdoor habitat with playful otters and regular feedings.",
    tags: ["Natural Light", "Some Noise"],
    accent: "#8D79C8",
  },
  {
    id: "touch",
    name: "Tide Pools",
    x: 46,
    y: 73,
    walk: "6 min walk",
    desc: "Hands-on exploration area with tidepool animals.",
    tags: ["Free Play", "Natural Light"],
    accent: "#31A8B3",
  },
];

const routeStops = [
  { name: "Sea Otter Exhibit", mins: "10 min" },
  { name: "Kelp Forest", mins: "8 min" },
  { name: "Monterey Bay Habitat", mins: "12 min" },
  { name: "Jellies", mins: "16 min" },
];

export default function AquariumPrototype() {
  const [activeTab, setActiveTab] = useState("map");
  const [mapLayer, setMapLayer] = useState("general");
  const [selectedExhibit, setSelectedExhibit] = useState(exhibits[0]);
  const [avoidLoud, setAvoidLoud] = useState(true);
  const [preferLowLighting, setPreferLowLighting] = useState(true);
  const [alertType, setAlertType] = useState(0);
  const [completedStops, setCompletedStops] = useState(2);

  const alerts = [
    {
      banner: "Sea otter feeding starts in 10 minutes!",
      sub: "Head to the Sea Otter Exhibit",
      cardTitle: "You are entering a louder area",
      cardBody: "The Open Sea gallery is known for higher ambient noise.",
      cta: "Tap for quiet area options nearby",
      icon: <Bell className="w-4 h-4" />,
      tone: COLORS.primary,
    },
    {
      banner: "Quiet zone nearby",
      sub: "Kelp Forest is a calmer route option",
      cardTitle: "This route stays mostly quiet",
      cardBody: "You can continue on the lower-sensory path from here.",
      cta: "See route options",
      icon: <Volume2 className="w-4 h-4" />,
      tone: "#0E7A73",
    },
    {
      banner: "Low-light area ahead",
      sub: "Jellies gallery begins in 2 minutes",
      cardTitle: "Lighting will be dimmer ahead",
      cardBody: "This next section has darker exhibit conditions.",
      cta: "Show alternate route",
      icon: <SunMedium className="w-4 h-4" />,
      tone: "#8A5AC2",
    },
  ];

  const currentAlert = alerts[alertType];

  const recommendedRoute = useMemo(() => {
    if (avoidLoud && preferLowLighting) {
      return {
        title: "LOW SENSORY ROUTE",
        duration: "1 h 45 min",
        distance: "0.9 mi",
        desc: "Mostly quiet, low light environments",
        pill: "Low Stimulus",
        color: COLORS.routeGreen,
        bg: COLORS.softGreen,
      };
    }
    return {
      title: "SHORTEST ROUTE",
      duration: "1 h 20 min",
      distance: "0.7 mi",
      desc: "More direct path with higher activity areas",
      pill: "Standard",
      color: COLORS.primary,
      bg: COLORS.softBlue,
    };
  }, [avoidLoud, preferLowLighting]);

  return (
    <div className="min-h-screen bg-[#EEF2F5] p-8">
      <div className="mx-auto max-w-[1380px]">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <div className="text-[14px] font-semibold uppercase tracking-[0.18em] text-slate-500">Interactive prototype</div>
            <h1 className="mt-2 text-[34px] font-semibold leading-tight text-slate-800">Monterey Bay Aquarium mobile app</h1>
            <p className="mt-2 max-w-[780px] text-[15px] leading-6 text-slate-500">
              A polished prototype focused on the three core workflows: interactive map layers, sensory-aware route planning, and live navigation with real-time alerts.
            </p>
          </div>
          <div className="flex gap-8 text-[13px] font-semibold uppercase tracking-[0.12em] text-slate-500">
            <span>1 Main map</span>
            <span>2 Route planning</span>
            <span>3 Live navigation + alerts</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 xl:grid-cols-3">
          <PhoneShell>
            <MapScreen
              mapLayer={mapLayer}
              setMapLayer={setMapLayer}
              selectedExhibit={selectedExhibit}
              setSelectedExhibit={setSelectedExhibit}
              setActiveTab={setActiveTab}
            />
          </PhoneShell>

          <PhoneShell>
            <PlanScreen
              avoidLoud={avoidLoud}
              setAvoidLoud={setAvoidLoud}
              preferLowLighting={preferLowLighting}
              setPreferLowLighting={setPreferLowLighting}
              recommendedRoute={recommendedRoute}
              setActiveTab={setActiveTab}
            />
          </PhoneShell>

          <PhoneShell>
            <NavigationScreen
              currentAlert={currentAlert}
              completedStops={completedStops}
              setCompletedStops={setCompletedStops}
              cycleAlert={() => setAlertType((prev) => (prev + 1) % alerts.length)}
            />
          </PhoneShell>
        </div>

        <div className="mt-10 flex flex-wrap gap-12 text-[14px] text-slate-600">
          <LegendLabel number="1" title="MAIN MAP" subtitle="Toggle between views and explore the aquarium. Tap any location for details and navigation." />
          <LegendLabel number="2" title="ROUTE PLANNING" subtitle="Build a personalized route based on your time and sensory preferences." />
          <LegendLabel number="3" title="LIVE NAVIGATION + ALERTS" subtitle="Real-time guidance, sensory alerts, and event notifications keep you informed on the go." />
        </div>
      </div>
    </div>
  );
}

function PhoneShell({ children }) {
  return (
    <div className="mx-auto w-[418px]">
      <div className="rounded-[48px] border-[10px] border-black bg-white shadow-[0_20px_50px_rgba(12,25,45,0.18)] overflow-hidden">
        <div className="relative flex h-[58px] items-start justify-center bg-white">
          <div className="mt-0 h-[30px] w-[162px] rounded-b-[24px] bg-black" />
          <div className="absolute left-[24px] top-[14px] text-[22px] font-medium text-slate-700">9:41</div>
          <div className="absolute right-[24px] top-[16px] flex gap-[6px]">
            <div className="h-[10px] w-[16px] rounded-[3px] border border-slate-700" />
            <div className="h-[10px] w-[18px] rounded-[3px] bg-slate-700" />
          </div>
        </div>
        <div className="h-[860px] bg-white">{children}</div>
      </div>
    </div>
  );
}

function MapScreen({ mapLayer, setMapLayer, selectedExhibit, setSelectedExhibit, setActiveTab }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center justify-between px-6 pt-6">
        <div className="flex items-center gap-3">
          <div className="grid h-[44px] w-[44px] place-items-center rounded-full bg-[#E6F0FA] text-[#0E5FB8]">
            <Waves className="h-6 w-6" />
          </div>
          <div className="text-[15px] font-semibold leading-[18px] text-[#17416B]">Monterey Bay\nAquarium</div>
        </div>
        <div className="flex gap-5 text-[#304D6B]">
          <Search className="h-6 w-6" />
          <Bell className="h-6 w-6" />
        </div>
      </div>

      <div className="px-5 pt-5">
        <div className="grid grid-cols-3 rounded-[14px] bg-[#F3F5F8] p-[4px] text-[15px]">
          {[
            ["general", "General"],
            ["sensory", "Sensory"],
            ["animals", "Animals"],
          ].map(([value, label]) => (
            <button
              key={value}
              onClick={() => setMapLayer(value)}
              className="rounded-[10px] px-4 py-[10px] font-medium transition"
              style={{
                background: mapLayer === value ? COLORS.primary : "transparent",
                color: mapLayer === value ? "#FFFFFF" : COLORS.textMuted,
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative mt-4 flex-1 overflow-hidden bg-[#D9E8EF]">
        <MapCanvas mapLayer={mapLayer} selectedExhibit={selectedExhibit} setSelectedExhibit={setSelectedExhibit} />

        <div className="absolute right-[16px] top-[132px] flex flex-col overflow-hidden rounded-[16px] border border-white shadow-lg">
          <div className="grid h-[46px] w-[44px] place-items-center bg-white text-[16px] font-semibold text-[#6B7D8B]">L2</div>
          <div className="grid h-[46px] w-[44px] place-items-center bg-[#2D73E0] text-[16px] font-semibold text-white">L1</div>
          <div className="grid h-[46px] w-[44px] place-items-center bg-white text-[16px] font-semibold text-[#6B7D8B]">LL</div>
        </div>

        <div className="absolute left-[16px] top-[126px] flex h-[44px] w-[44px] items-center justify-center rounded-[12px] bg-[#3E5369] text-white shadow-lg">
          <CalendarDays className="h-5 w-5" />
        </div>
        <div className="absolute left-[16px] top-[300px] flex h-[44px] w-[44px] items-center justify-center rounded-[12px] bg-[#2F86B7] text-white shadow-lg">
          <MapPin className="h-5 w-5" />
        </div>
        <div className="absolute left-[16px] top-[534px] flex h-[44px] w-[44px] items-center justify-center rounded-[12px] bg-[#2F86B7] text-white shadow-lg">
          <Info className="h-5 w-5" />
        </div>
        <div className="absolute right-[16px] bottom-[128px] flex h-[58px] w-[58px] items-center justify-center rounded-full bg-white text-[#2D73E0] shadow-[0_12px_24px_rgba(18,56,102,0.18)]">
          <LocateFixed className="h-7 w-7" />
        </div>
      </div>

      <div className="border-t border-[#EDF1F4] bg-white px-5 pb-4 pt-4">
        <div className="rounded-[24px] bg-white shadow-[0_12px_28px_rgba(18,56,102,0.10)] ring-1 ring-[#E8EEF2] overflow-hidden">
          <div className="flex gap-4 p-4">
            <div className="h-[138px] w-[112px] rounded-[16px] bg-[linear-gradient(180deg,#174A74_0%,#2F6C8E_25%,#407C67_100%)] flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="text-[18px] font-semibold leading-tight text-[#1B2F42]">Kelp Forest</div>
              <p className="mt-2 text-[14px] leading-[20px] text-[#5C7285]">
                A vibrant underwater forest teeming with fish, invertebrates, and kelp.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Tag text="Low Light" />
                <Tag text="Moderate Noise" />
                <Tag text="Cooler Area" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between px-4 pb-4 text-[15px] text-[#3D5267]">
            <div className="flex items-center gap-3">
              <span>5 min away</span>
              <span>•</span>
              <span>0.2 mi</span>
            </div>
          </div>
          <div className="flex gap-3 px-4 pb-4">
            <button
              onClick={() => setActiveTab("plan")}
              className="flex-1 rounded-[14px] bg-[#1D73E0] px-4 py-[15px] text-[18px] font-semibold text-white"
            >
              Navigate
            </button>
            <button className="grid h-[54px] w-[54px] place-items-center rounded-[14px] border border-[#DCE4EA] bg-white text-[#6C7E8C]">
              <Bookmark className="h-5 w-5" />
            </button>
          </div>
        </div>

        <BottomNav active="map" />
      </div>
    </div>
  );
}

function MapCanvas({ mapLayer, selectedExhibit, setSelectedExhibit }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[linear-gradient(180deg,#D9ECF3_0%,#CEE4EE_100%)]">
      <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_85%_20%,rgba(255,255,255,0.45),transparent_28%)]" />

      <div className="absolute left-[6%] top-[16%] h-[30%] w-[44%] rounded-[40px] border-[6px] border-[#F7FBFD] bg-[#C6DAE7] shadow-inner" />
      <div className="absolute left-[44%] top-[38%] h-[18%] w-[28%] rounded-[24px] border-[6px] border-[#F7FBFD] bg-[#8EC1E1] shadow-inner" />
      <div className="absolute left-[57%] top-[60%] h-[17%] w-[18%] rounded-[20px] border-[6px] border-[#F7FBFD] bg-[#DAB088] shadow-inner" />
      <div className="absolute left-[9%] top-[62%] h-[18%] w-[26%] rounded-[24px] border-[6px] border-[#F7FBFD] bg-[#9CC189] shadow-inner" />

      {mapLayer === "sensory" && (
        <>
          <div className="absolute left-[8%] top-[20%] h-[28%] w-[46%] rounded-[40px] border-[6px] border-[#F7FBFD] bg-[rgba(202,221,233,0.86)]" />
          <div className="absolute left-[11%] top-[58%] h-[18%] w-[28%] rounded-[24px] border-[6px] border-[#F7FBFD] bg-[rgba(140,186,132,0.88)]" />
          <div className="absolute left-[57%] top-[58%] h-[16%] w-[21%] rounded-[20px] border-[6px] border-[#F7FBFD] bg-[rgba(224,167,112,0.92)]" />
        </>
      )}

      <div className="absolute left-[2%] top-[48%] h-[10px] w-[64%] rotate-[24deg] rounded-full bg-white/95" />
      <div className="absolute left-[18%] top-[72%] h-[10px] w-[58%] rotate-[-6deg] rounded-full bg-white/95" />
      <div className="absolute left-[29%] top-[34%] h-[10px] w-[54%] rotate-[-16deg] rounded-full bg-white/95" />
      <div className="absolute left-[55%] top-[22%] h-[10px] w-[22%] rotate-[12deg] rounded-full bg-white/95" />

      <MapChip x="36%" y="20%" text="Kelp Forest" selected={selectedExhibit.id === "kelp"} onClick={() => setSelectedExhibit(exhibits[0])} />
      <MapChip x="54%" y="48%" text="Sea Otter\nExhibit" purple selected={selectedExhibit.id === "otter"} onClick={() => setSelectedExhibit(exhibits[1])} />
      <MapChip x="44%" y="69%" text="Tide Pools" teal selected={selectedExhibit.id === "touch"} onClick={() => setSelectedExhibit(exhibits[2])} />
      <MapLabel x="71%" y="31%" text="The Great\nWhales" />
      <MapLabel x="12%" y="41%" text="Tentacles" />
      <MapLabel x="8%" y="66%" text="Monterey Bay\nHabitat" green />
      <MapLabel x="65%" y="84%" text="Cafe" orange />

      <div className="absolute left-[41%] top-[59%] -translate-x-1/2 -translate-y-1/2">
        <div className="h-[26px] w-[26px] rounded-full border-[4px] border-white bg-[#1A6FE0] shadow-lg" />
        <div className="ml-[4px] mt-[-18px] h-0 w-0 rotate-[18deg] border-l-[11px] border-r-[11px] border-b-[24px] border-l-transparent border-r-transparent border-b-[#1A6FE0]" />
      </div>
    </div>
  );
}

function PlanScreen({ avoidLoud, setAvoidLoud, preferLowLighting, setPreferLowLighting, recommendedRoute, setActiveTab }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center justify-between px-5 pt-6">
        <ChevronLeft className="h-7 w-7 text-[#2D465D]" />
        <div className="text-[18px] font-semibold text-[#263A4E]">Plan Your Visit</div>
        <div className="w-7" />
      </div>

      <div className="px-5 pt-4">
        <div className="grid grid-cols-2 rounded-[14px] bg-[#F0F4F7] p-[4px] text-[15px] font-medium">
          <button className="rounded-[10px] bg-[#0E5FB8] py-[10px] text-white">Create a Route</button>
          <button className="rounded-[10px] py-[10px] text-[#6A7C8C]">Saved Routes</button>
        </div>
      </div>

      <div className="px-5 pt-5">
        <div className="text-[18px] font-semibold text-[#203345]">Route Preferences</div>
        <div className="text-[14px] text-[#718392]">Customize your experience</div>

        <div className="mt-4 grid grid-cols-4 gap-3">
          <PreferenceCard active icon={<Volume2 className="h-5 w-5" />} label="Avoid\nLoud Areas" />
          <PreferenceCard icon={<SunMedium className="h-5 w-5" />} label="Prefer Low\nLighting" />
          <PreferenceCard icon={<Compass className="h-5 w-5" />} label="Avoid\nCrowds" />
          <PreferenceCard icon={<Info className="h-5 w-5" />} label="More\nOptions" />
        </div>
      </div>

      <div className="px-5 pt-5">
        <div className="flex items-center justify-between">
          <div className="text-[18px] font-semibold text-[#203345]">Must-See Exhibits <span className="text-[#758694]">(3)</span></div>
          <button className="text-[14px] font-medium text-[#1D73E0]">Edit</button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <BubbleChip label="Sea Otters" />
          <BubbleChip label="Kelp Forest" />
          <BubbleChip label="Jellies" />
        </div>
      </div>

      <div className="px-5 pt-5">
        <div className="text-[18px] font-semibold text-[#203345]">Route Options</div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <RouteOptionCard
            title="LOW SENSORY ROUTE"
            duration="1 h 45 min"
            distance="0.9 mi"
            body="Mostly quiet, low light environments"
            pill="Low Stimulus"
            selected
            tone={COLORS.routeGreen}
          />
          <RouteOptionCard
            title="SHORTEST ROUTE"
            duration="1 h 20 min"
            distance="0.7 mi"
            body="More direct path with higher activity areas"
            pill="Standard"
            tone={COLORS.primary}
          />
        </div>
      </div>

      <div className="mt-5 px-5">
        <div className="relative h-[176px] overflow-hidden rounded-[18px] border border-[#E2E9EE] bg-[linear-gradient(180deg,#D9ECF3_0%,#DCE6E7_100%)]">
          <div className="absolute left-[8%] top-[14%] h-[22px] w-[22px] rounded-full bg-white ring-2 ring-[#2D73E0]" />
          <div className="absolute left-[10%] top-[16%] rounded-[12px] bg-[#1A5CAC] px-3 py-[8px] text-[14px] font-semibold text-white">Start</div>

          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
            <path d="M10 22 C18 26, 20 34, 22 48 S32 78, 45 78 S57 70, 61 58 S68 40, 76 37" fill="none" stroke="#2AA55E" strokeWidth="4" strokeDasharray="5 5" strokeLinecap="round" />
            <circle cx="22" cy="49" r="4" fill="#2AA55E" />
            <circle cx="45" cy="78" r="4" fill="#2AA55E" />
            <circle cx="61" cy="58" r="4" fill="#2AA55E" />
          </svg>

          <FloatingLabel x="54%" y="36%" text="Jellyfish Gallery" />
          <FloatingLabel x="70%" y="56%" text="Tide Pools" orange />
          <FloatingLabel x="49%" y="74%" text="Toothed Shark Zone" />
        </div>
      </div>

      <div className="mt-4 flex-1 px-5">
        <div className="rounded-[18px] border border-[#E5EBEF] bg-white p-4">
          {routeStops.slice(0, 3).map((stop, idx) => (
            <div key={stop.name} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="grid h-[28px] w-[28px] place-items-center rounded-full bg-[#20A05F] text-[13px] font-semibold text-white">{idx + 1}</div>
                <span className="text-[15px] font-medium text-[#263A4E]">{stop.name}</span>
              </div>
              <div className="text-[14px] text-[#6F818F]">{stop.mins}</div>
            </div>
          ))}
          <div className="pt-1 text-[14px] text-[#6F818F]">+2 more stops</div>
        </div>
      </div>

      <div className="px-5 pb-4 pt-4">
        <button
          onClick={() => setActiveTab("nav")}
          className="w-full rounded-[16px] bg-[#1D73E0] py-[16px] text-[20px] font-semibold text-white"
        >
          Start This Route
        </button>
        <button className="mt-3 flex w-full items-center justify-center gap-2 text-[16px] font-medium text-[#1D73E0]">
          <Bookmark className="h-4 w-4" /> Save Route for Later
        </button>
      </div>
    </div>
  );
}

function NavigationScreen({ currentAlert, completedStops, setCompletedStops, cycleAlert }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="relative flex-1 overflow-hidden bg-[linear-gradient(180deg,#D7E8F1_0%,#C6DCE7_100%)]">
        <div className="absolute inset-x-5 top-5 rounded-[18px] bg-[#124AA3] px-5 py-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-[18px] font-semibold">
                {currentAlert.icon}
                <span>{currentAlert.banner}</span>
              </div>
              <div className="mt-1 text-[14px] text-white/85">{currentAlert.sub}</div>
            </div>
            <button onClick={cycleAlert} className="rounded-full bg-white/15 px-3 py-2 text-[14px] font-medium">View</button>
          </div>
        </div>

        <div className="absolute left-[13%] top-[24%] rounded-[14px] bg-[#7B60BB] px-3 py-[9px] text-[14px] font-semibold leading-tight text-white shadow-lg">Sea Otter\nExhibit</div>
        <div className="absolute right-[19%] top-[32%] rounded-[14px] bg-[#4B5970] px-3 py-[9px] text-[14px] font-semibold text-white shadow-lg">Kelp Forest</div>
        <div className="absolute left-[54%] top-[72%] rounded-[14px] bg-[#32A5B0] px-3 py-[9px] text-[14px] font-semibold text-white shadow-lg">Tide Pools</div>
        <div className="absolute left-[7%] top-[80%] rounded-[12px] bg-[#C87E2D] px-3 py-[8px] text-[14px] font-semibold text-white shadow-lg">Cafe</div>

        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          <path d="M26 27 C36 30, 38 38, 46 45 S58 60, 66 66 S73 71, 80 78" fill="none" stroke="#1E73E0" strokeWidth="4" strokeDasharray="0 0" strokeLinecap="round" />
          <path d="M26 27 C36 30, 38 38, 46 45 S58 60, 66 66 S73 71, 80 78" fill="none" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" opacity="0.65" />
          <path d="M26 27 C36 30, 38 38, 46 45 S58 60, 66 66 S73 71, 80 78" fill="none" stroke="#1E73E0" strokeWidth="4" strokeLinecap="round" />
          <circle cx="79" cy="78" r="4" fill="#1E73E0" />
          <circle cx="66" cy="66" r="4" fill="#1E73E0" />
          <circle cx="46" cy="45" r="4" fill="#1E73E0" />
          <circle cx="26" cy="27" r="4" fill="#7B60BB" />
        </svg>

        <div className="absolute left-[46%] top-[52%] -translate-x-1/2 -translate-y-1/2">
          <div className="h-[26px] w-[26px] rounded-full border-[4px] border-white bg-[#1A6FE0] shadow-lg" />
          <div className="ml-[4px] mt-[-18px] h-0 w-0 rotate-[15deg] border-l-[11px] border-r-[11px] border-b-[24px] border-l-transparent border-r-transparent border-b-[#1A6FE0]" />
        </div>

        <div className="absolute right-[16px] top-[116px] flex flex-col overflow-hidden rounded-[16px] border border-white shadow-lg">
          <div className="grid h-[46px] w-[44px] place-items-center bg-white text-[16px] font-semibold text-[#6B7D8B]">L2</div>
          <div className="grid h-[46px] w-[44px] place-items-center bg-[#2D73E0] text-[16px] font-semibold text-white">L1</div>
          <div className="grid h-[46px] w-[44px] place-items-center bg-white text-[16px] font-semibold text-[#6B7D8B]">LL</div>
        </div>
        <div className="absolute left-[16px] top-[196px] flex h-[44px] w-[44px] items-center justify-center rounded-[12px] bg-[#43546B] text-white shadow-lg"><Info className="h-5 w-5" /></div>
        <div className="absolute left-[16px] top-[432px] flex h-[44px] w-[44px] items-center justify-center rounded-[12px] bg-[#43546B] text-white shadow-lg"><MapPin className="h-5 w-5" /></div>
        <div className="absolute right-[16px] bottom-[232px] flex h-[56px] w-[56px] items-center justify-center rounded-full bg-white text-[#1D73E0] shadow-lg"><Compass className="h-7 w-7" /></div>

        <div className="absolute inset-x-5 bottom-[188px] rounded-[22px] border border-[#E6EDF2] bg-white px-5 py-4 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="mt-[2px] text-[#EF8E34]"><AlertTriangle className="h-5 w-5" /></div>
            <div className="min-w-0">
              <div className="text-[22px] font-semibold leading-tight text-[#24384D]">{currentAlert.cardTitle}</div>
              <div className="mt-2 text-[15px] leading-6 text-[#607486]">{currentAlert.cardBody}</div>
              <button className="mt-3 text-[14px] font-medium text-[#1D73E0]">{currentAlert.cta}</button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#EDF1F4] bg-white px-5 pb-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[20px] font-semibold text-[#24384D]">Your Visit</div>
            <div className="mt-1 text-[15px] text-[#607486]">{completedStops} of 5 stops completed</div>
          </div>
          <div className="text-right">
            <div className="text-[15px] font-semibold text-[#1D73E0]">Next Stop</div>
            <div className="mt-1 text-[15px] text-[#607486]">8 min away</div>
          </div>
        </div>

        <div className="mt-3 flex gap-2">
          <div className="h-[6px] flex-1 rounded-full bg-[#1D73E0]" />
          <div className="h-[6px] flex-1 rounded-full bg-[#D9E1E8]" />
          <div className="h-[6px] flex-1 rounded-full bg-[#D9E1E8]" />
        </div>

        <div className="mt-4 rounded-[20px] border border-[#E6EDF2] bg-[#F8FBFD] p-3">
          <div className="flex items-center gap-3">
            <div className="h-[74px] w-[86px] rounded-[14px] bg-[linear-gradient(180deg,#6E8C96_0%,#BFD2D3_100%)]" />
            <div className="min-w-0 flex-1">
              <div className="text-[18px] font-semibold text-[#24384D]">Sea Otters</div>
              <div className="mt-1 text-[14px] leading-5 text-[#607486]">Watch these playful otters glide and dive in their habitat.</div>
            </div>
            <button className="rounded-[12px] bg-[#1D73E0] px-4 py-[11px] text-[16px] font-semibold text-white">Directions</button>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <NavRow index={3} label="Kelp Forest" time="12 min" />
          <NavRow index={4} label="Monterey Bay Habitat" time="18 min" />
        </div>

        <div className="mt-4 flex gap-3">
          <button onClick={() => setCompletedStops((prev) => Math.min(5, prev + 1))} className="flex-1 rounded-[14px] bg-[#1D73E0] py-[14px] text-[18px] font-semibold text-white">Mark Complete</button>
          <button className="rounded-[14px] border border-[#DCE4EA] px-5 py-[14px] text-[17px] font-medium text-[#5E7385]">Pause</button>
        </div>

        <BottomNav active="map" />
      </div>
    </div>
  );
}

function PreferenceCard({ icon, label, active = false }) {
  return (
    <div className="rounded-[18px] border px-3 py-4 text-center" style={{ borderColor: active ? COLORS.primary : "#E0E7EC", background: active ? "#F2F7FD" : "#FFFFFF" }}>
      <div className="mx-auto grid h-[34px] w-[34px] place-items-center rounded-full bg-[#EEF4FA] text-[#1D73E0]">{icon}</div>
      <div className="mt-2 whitespace-pre-line text-[13px] font-medium leading-4 text-[#31475A]">{label}</div>
    </div>
  );
}

function RouteOptionCard({ title, duration, distance, body, pill, selected = false, tone }) {
  return (
    <div className="rounded-[18px] border p-4" style={{ borderColor: selected ? tone : "#E0E7EC", background: selected ? "#EEF8F1" : "#FFFFFF" }}>
      <div className="text-[13px] font-bold tracking-[0.04em]" style={{ color: selected ? tone : "#697C8A" }}>{title}</div>
      <div className="mt-2 flex items-center gap-2 text-[#24384D]">
        <span className="text-[26px] font-semibold">{duration}</span>
        <span className="text-[14px] text-[#607486]">• {distance}</span>
      </div>
      <div className="mt-2 text-[15px] leading-5 text-[#607486]">{body}</div>
      <div className="mt-3 inline-flex rounded-full px-3 py-[6px] text-[13px] font-medium" style={{ background: selected ? "#DDF2E5" : "#EDF3FA", color: selected ? tone : COLORS.primary }}>{pill}</div>
    </div>
  );
}

function Tag({ text }) {
  return <span className="rounded-full bg-[#EEF4FA] px-3 py-[7px] text-[13px] font-medium text-[#32506A]">{text}</span>;
}

function BubbleChip({ label }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-[#EEF2F6] px-3 py-[8px] text-[14px] font-medium text-[#31475A]">
      <div className="h-[28px] w-[28px] rounded-full bg-[linear-gradient(180deg,#5F839A_0%,#A4C0C7_100%)]" />
      {label}
      <span className="text-[#7C8F9D]">×</span>
    </div>
  );
}

function FloatingLabel({ x, y, text, orange = false }) {
  return (
    <div className="absolute rounded-[14px] px-4 py-[10px] text-[15px] font-semibold shadow-lg" style={{ left: x, top: y, background: orange ? "#F29B38" : "#FFFFFF", color: orange ? "#FFFFFF" : "#1E3550" }}>
      {text}
    </div>
  );
}

function MapChip({ x, y, text, selected = false, purple = false, teal = false, onClick }) {
  const bg = purple ? "#7A62BB" : teal ? "#30A3B0" : selected ? "#1C4C86" : "#1C4C86";
  return (
    <button onClick={onClick} className="absolute rounded-[14px] px-4 py-[9px] text-left text-[15px] font-semibold leading-tight text-white shadow-xl" style={{ left: x, top: y, background: bg }}>
      {text}
    </button>
  );
}

function MapLabel({ x, y, text, green = false, orange = false }) {
  return (
    <div className="absolute rounded-[12px] px-3 py-[8px] text-[14px] font-semibold leading-tight shadow-lg" style={{ left: x, top: y, background: green ? "#7CB07C" : orange ? "#C57A2F" : "transparent", color: green || orange ? "#FFFFFF" : "#556878" }}>
      {text}
    </div>
  );
}

function NavRow({ index, label, time }) {
  return (
    <div className="flex items-center justify-between rounded-[16px] bg-[#F8FBFD] px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="grid h-[28px] w-[28px] place-items-center rounded-full bg-[#20A05F] text-[13px] font-semibold text-white">{index}</div>
        <div className="text-[16px] font-medium text-[#24384D]">{label}</div>
      </div>
      <div className="flex items-center gap-2 text-[15px] text-[#607486]">
        <span>{time}</span>
        <ChevronRight className="h-4 w-4" />
      </div>
    </div>
  );
}

function BottomNav({ active }) {
  const items = [
    { id: "map", label: "Map", icon: <MapPin className="h-5 w-5" /> },
    { id: "plan", label: "Plan", icon: <Compass className="h-5 w-5" /> },
    { id: "events", label: "Events", icon: <CalendarDays className="h-5 w-5" /> },
    { id: "explore", label: "Explore", icon: <Search className="h-5 w-5" /> },
    { id: "info", label: "Info", icon: <Info className="h-5 w-5" /> },
  ];

  return (
    <div className="mt-4 flex items-center justify-between px-2 pt-2 text-[12px]">
      {items.map((item) => (
        <div key={item.id} className="flex flex-col items-center gap-1 text-[#607486]">
          <div className={item.id === active ? "text-[#1D73E0]" : "text-[#607486]"}>{item.icon}</div>
          <span className={item.id === active ? "font-semibold text-[#1D73E0]" : ""}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function LegendLabel({ number, title, subtitle }) {
  return (
    <div className="max-w-[360px]">
      <div className="flex items-center gap-3">
        <div className="grid h-[32px] w-[32px] place-items-center rounded-full bg-[#1D73E0] text-[16px] font-semibold text-white">{number}</div>
        <div className="text-[18px] font-bold tracking-[0.02em] text-[#1B4070]">{title}</div>
      </div>
      <div className="mt-2 pl-[44px] text-[15px] leading-6 text-slate-600">{subtitle}</div>
    </div>
  );
}
