/*
  PROJECTS
  ========
  Every project on the site lives in this one list.

  Add a project ....... copy the TEMPLATE at the bottom of this file, paste it into the
                        list below, and fill it in.
  Remove a project .... delete its { ... } block (including the trailing comma).
  Reorder ............. move blocks up or down. The first project opens by default.

  Only `id` and `title` are required. Leave any other field out (or empty) and that part
  of the project panel simply doesn't show. A software project with no specs just has no
  specs block, and so on.

  Fields
  ------
  id        Short unique name: lowercase letters, numbers, dashes. Also used for direct
            links, e.g. yoursite.com/#project-telescope
  title     Project name.
  subtitle  One-line description shown next to the title.
  kind      e.g. "Software", "Hardware + software", "Firmware".
  status    e.g. "In progress", "Complete".
  year      e.g. "2026" or "2025–2026".
  summary   Two or three sentences: what it is and why you built it.
  built     List of bullet points: what you built.
  stack     List of tags: languages, frameworks, tools.
  specs     List of { label, value } pairs. Handy for hardware numbers.
  images    List of { src, caption }. Put the files in images/<id>/.
            Leave `src` out to show a placeholder box with the caption instead.
  links     Buttons shown to the right of the project title. List of { type, url }.
            Add `label` to change the word on the button.
            Add `color: "#RRGGBB"` to change the color the icon lights up on hover.
            Add `icon: "images/icons/my-icon.svg"` to use your own icon image instead.
  map       Optional { x, y } position of this project's star on the map, in percent
            (0–100). Leave it out and the star is placed automatically.

  Link types
  ----------
  Brands: the logo is cream, and lights up in the brand's color on hover.
    "github"       GitHub
    "youtube"      YouTube
    "printables"   Printables
    "thingiverse"  Thingiverse
    Any other brand works too: type its name, e.g. "hackaday", "instructables", "itchdotio".
    (Names come from simpleicons.org. Search there if a logo doesn't show up.)

  General: the icon turns amber on hover.
    "demo"         globe icon, "Live demo"
    "website"      globe icon, "Website"
    "cad"          cube icon, "CAD model"
    "onshape"      cube icon, "Onshape"  (there's no Onshape logo in the icon library)
    "download"     arrow icon, "Download". Point `url` at a file in this folder,
                   e.g. "files/schematic.pdf"
    "link"         chain icon, "Link"  (also used when `type` is left out)

  Example:
    links: [
      { type: "github", url: "https://github.com/me/repo" },
      { type: "youtube", url: "https://youtu.be/xyz", label: "Demo video" },
      { type: "download", url: "files/schematic.pdf", label: "Schematic" },
    ],
*/

// const PROJECTS = [
//   {
//     id: "telescope",
//     title: "Autonomous Telescope",
//     subtitle: "Two-axis tracking mount, from PCB to web interface",
//     kind: "Hardware + software",
//     status: "Working prototype",
//     year: "2025-2026",
//     summary: "I built an autonomous telescope system to automate the movement and tracking of a telescope. I have always had an interest in space, and wanted to use the project to learn more about robotics while combining the skills I developed throughout university.",
//     built: ["Built a Flask-based interface on a Raspberry Pi 5 to control the telescope.", 
//         "Designed a 3D-printed two-axis mount and custom PCB using Onshape and KiCad.", 
//         "Developed STM32 motor control and communication between the Raspberry Pi and telescope mount.",
//       ],
//     stack: ["Python/C", "Flask", "Onshape", "KiCad"],
//     specs: [
//       { label: "Aperture", value: "[— mm]" },
//       { label: "Focal length", value: "[— mm]" },
//     ],
//     images: [
//       { src: "images/telescope/gear.png", caption: "Gear" },
//       { src: "images/telescope/TelescopePCB.png", caption: "PCB layout" },
//       { src:"images/telescope/hud.png", caption: "[Telescope photo]" },
//       { caption: "[Software screenshot]" },
//     ],
//     links: [
//       { type: "github", url: "https://github.com/[username]/[repo]" },
//     ],
//   },
// ];

const PROJECTS = [
  {
    id: "telescope",
    title: "Autonomous Telescope",
    subtitle: "Two-axis tracking mount, from PCB to web interface",
    kind: "Hardware + software",
    status: "Working prototype",
    year: "2025–2026",
    summary: "A motorised alt-az mount that works out where it is from GPS, then finds a planet and follows it across the sky, all controlled from a web browser. I've always been into space, and this project was my way to learn robotics by building every layer myself: the mechanics, the electronics, the firmware and the software.",
    built: [
      "The mount: two 3D-printed axes I designed in Onshape, each driven by a stepper motor through its own gear reduction.",
      "The electronics: a custom board I laid out in KiCad that ties the Raspberry Pi 5, the STM32 microcontroller, the GPS module and the stepper drivers together.",
      "The split: the STM32 runs the real-time motor control in C, and the Pi handles everything else, sending it commands over a UART protocol.",
      "The software: a Python/Flask app takes the GPS location and time, works out where each planet is, points the telescope there and keeps tracking it. The web dashboard adds a live camera feed and star calibration on Polaris.",
      "Safety: layered into the software, with motion limits, cable-wrap protection, a dead-man switch for manual control, and constant monitoring of the link to the microcontroller.",
    ],
    stack: ["Python", "C", "Flask", "JavaScript", "STM32", "Raspberry Pi", "Onshape", "KiCad", "Orion SkyQuest XT8"],
    specs: [
      { label: "Telescope", value: "Orion SkyQuest XT8 Classic Dobsonian" },
      { label: "Aperture", value: "203 mm (8\")" },
      { label: "Focal length", value: "1200 mm (f/5.9)" },
      { label: "Motors", value: "NEMA 17 (el) · NEMA 23 (az)" },
      { label: "Gearing", value: "12:120 el · 30:200 az" },
      { label: "Resolution", value: "0.09° el · 0.135° az per step" },
      { label: "Controller", value: "Raspberry Pi 5 + STM32L432KC" },
    ],
    images: [
      { src: "images/telescope/system.JPEG", caption: "Entire System Assembled" },
      { src: "images/telescope/gear.png", caption: "3D-printed gear" },
      { src: "images/telescope/TelescopePCB.png", caption: "Custom PCB layout" },
      { src: "images/telescope/hud.png", caption: "Web control dashboard" },
      // Add a photo of the build and set its src, or delete this line.
    ],
    links: [
      { type: "github", url: "https://github.com/Eddy-Nasreddine/Telescope-Automation" },
    ],
  },

  {
    id: "bearbuddy",
    title: "BearBuddy",
    subtitle: "A social calendar app for University of Alberta students",
    kind: "Capstone · Team of 3",
    year: "2025",
    summary: "My capstone project, built in a group of three (me and two teammates): a mobile app that brings a University of Alberta student's schedule, campus events, friends and study spots into one place. I worked across the app and its Firebase backend, owning the calendar, the Google Calendar integration, the social features and the study-spot heatmap.",
    built: [
      "Calendar: day, week and month views that update in real time as events are created, plus uploading your class schedule.",
      "Google Calendar: events sync into the app every 2.5 minutes, with event invites and suggested free timeslots.",
      "Friends: friend requests, recommendations from a social-graph model of mutual connections, and controls for who can see your location.",
      "Heatmap: a live map of how busy each study spot is, built from real-time user density within a 5-metre radius.",
      "Profiles and backend: customisable profiles with social links, connected to Firestore, Cloud Functions, authentication and storage.",
    ],
    stack: ["Flutter", "Dart", "Firebase", "Firestore", "Cloud Functions", "Google Calendar API"],
    images: [
      { src: "images/bearbuddy/poster.webp", caption: "Capstone poster: the whole app at a glance" },
      { src: "images/bearbuddy/home-calendar-friends.png", caption: "Home, calendar and friends" },
      { src: "images/bearbuddy/profile-and-requests.png", caption: "Friend profiles, requests and recommendations" },
      { src: "images/bearbuddy/study-spots-and-map.png", caption: "Study spot ratings and the friends map" },
    ],
    links: [
      { type: "github", url: "https://github.com/ECE-493-Group-9-Capstone/Student-Calendar-App" },
    ],
  },

  {
    id: "rbmk-reactor",
    title: "RBMK Reactor Simulation",
    subtitle: "A neutron-by-neutron simulation of a Chernobyl-type reactor",
    kind: "Personal",
    year: "2026",
    summary: "A 2D simulation of an RBMK reactor, the type used at Chernobyl, built out of curiosity about how they actually work. Instead of boiling the core down to a single number, it simulates individual neutrons as they split uranium, boil the cooling water and poison the core with xenon. Do the wrong things in the wrong order and you can recreate the 1986 accident.",
    built: [
      "The core: a 56 × 30 grid of uranium fuel, cooling water, graphite moderators and control rods, with every neutron simulated individually and spent fuel refuelled automatically.",
      "Physics: only slow neutrons split uranium and each split releases three more, so the core can run away fast. Boiling water stops absorbing neutrons (the positive void coefficient), while hot fuel splits less often and pulls the power back down.",
      "Xenon: split fuel slowly turns into xenon, which eats neutrons and can trap the reactor at low power in a xenon pit, like Chernobyl before the test.",
      "Control rods: manual control, an automatic mode that holds a neutron target, and a SCRAM whose graphite tips push the power up before the rods can shut it down.",
      "Control panel: live readouts for temperature, power, coolant and steam, a 60-second power graph, and Geiger counter clicks synthesised for every split.",
    ],
    stack: ["Python", "Pygame"],
    specs: [
      { label: "Core", value: "56 × 30 cells" },
      { label: "Neutrons per split", value: "3" },
      { label: "Rated output", value: "3,200 MWt / 1,000 MWe (scaled)" },
    ],
    images: [
      { src: "images/rbmk-reactor/full-power.png", caption: "Running at full power, around 3,200 MW thermal" },
      { src: "images/rbmk-reactor/runaway.png", caption: "Pumps at 0%: the water boils off and the power runs away" },
    ],
    links: [
      { type: "github", url: "https://github.com/Eddy-Nasreddine/rbmk-reactor-sim" },
    ],
  },

  {
    id: "rsr-discord-bot",
    title: "RSR Discord Bot",
    subtitle: "Attendance, points and an unlock store for a gaming community",
    kind: "Client · Solo",
    status: "Still in use",
    year: "2025",
    summary: "A Discord bot that runs the economy for a client's gaming community: members earn points for showing up to operations and spend them in a store of loadout unlocks. It was my first solo client product, from the first version through deployment and upkeep, and it's still in use.",
    built: [
      "Attendance: an officer starts a session and picks a main or side op, members check in with a button to earn points, and the session closes itself on timeout and posts who attended.",
      "Store: 80 unlockable items arranged in trees, 61 gated behind other items and 27 behind a rank, with fuzzy matching so members don't have to type names exactly.",
      "Rules: role-based permissions, double points for officers, purchase confirmations and one refund per member each month.",
      "Data: a Google Sheet is the database, read and written through the Sheets API, with each Discord account linked to its member's row.",
      "Hosting: deployed and maintained on a virtual machine.",
    ],
    stack: ["Python", "discord.py", "Google Sheets API", "Discord API"],
    images: [
      { src: "images/rsr-discord-bot/attendance.png", caption: "Starting an op, checking in, and the attendee list it posts" },
      { src: "images/rsr-discord-bot/service-record.png", caption: "A member's service record: points, ops and unlocked relics" },
    ],
    links: [
      { type: "github", url: "https://github.com/Eddy-Nasreddine/RSR-Discord-Bot" },
    ],
  },

  {
    id: "qrrush",
    title: "QRRush",
    subtitle: "Pokémon GO-style QR code hunting for Android",
    kind: "Course · Team of 6",
    year: "2023",
    summary: "A Pokémon GO-style Android game: players find QR codes on a map, scan them for points, complete daily quests and climb the leaderboards. Built by a team of six for CMPUT 301, where I was one of the top contributors with around 115 commits.",
    built: [
      "Profile page: the User and QR code models, the profile screen and its custom list, sortable by score, name and date.",
      "Live data: total score, QR code count and leaderboard rank update live as codes are added, removed or bought, backed by a delete operation I added to our Firebase wrapper.",
      "Players: the leaderboard, searching for other players and viewing their profiles, plus profile pictures from the gallery and validated name and phone fields.",
      "Shop: the Rush Store screen, where buying a QR code updates your score and collection.",
      "Structure: reorganised the codebase into MVC packages and wrote the Javadoc.",
    ],
    stack: ["Java", "Android Studio", "Firebase", "Firestore", "MVC"],
    images: [
      { src: "images/qrrush/leaderboard.png", caption: "Leaderboard page" },
      { src: "images/qrrush/profile.png", caption: "Profile page" },
      { src: "images/qrrush/shop.png", caption: "Shop page" },
      { src: "images/qrrush/map.png", caption: "Map page" },
      { src: "images/qrrush/search.png", caption: "Search Bar" },
    ],
    links: [
      { type: "github", url: "https://github.com/CMPUT301W23T12/QR-Rush" },
    ],
  },

  {
    id: "ga-tip-predictor",
    title: "Genetic Algorithm Tip Predictor",
    subtitle: "Fuzzy logic, tuned by evolution",
    kind: "Course",
    year: "2024",
    summary: "A model that predicts restaurant tips from six ratings of the food and service. Two fuzzy logic systems score the food and the service, a third turns those scores into a tip, and a genetic algorithm tunes the whole thing against training data.",
    built: [
      "Fuzzy hierarchy: one system rates the food (temperature, flavour, portion), one rates the service (attentiveness, friendliness, speed), and a third combines them into a tip, using 63 rules in total.",
      "Evolution: each chromosome encodes the triangular membership functions, and the genetic algorithm evolves them to minimise total error on a training set before the best one is checked on a held-out test set.",
      "Result: 15% lower prediction error.",
    ],
    stack: ["Python", "EasyGA", "scikit-fuzzy", "NumPy", "pandas"],
    specs: [
      { label: "Population", value: "200" },
      { label: "Generations", value: "1,000" },
      { label: "Fuzzy rules", value: "63 (27 + 27 + 9)" },
      { label: "Error reduction", value: "15%" },
    ],
    images: [
      { src: "images/ga-tip-predictor/hierarchy.svg", caption: "How the six ratings become a tip, and what the genetic algorithm tunes" },
      { src: "images/ga-tip-predictor/chromosome.svg", caption: "What a chromosome encodes: the peaks s and t that shape every membership function" },
    ],
    links: [
      { type: "github", url: "https://github.com/Eddy-Nasreddine/Genetic-Tip-prediction-" },
    ],
  },
];




/* TEMPLATE: copy everything between the lines, paste it into the list above, fill it in.
-------------------------------------------------------------------------------------
  {
    id: "my-project",
    title: "My project",
    subtitle: "",
    kind: "Software",
    status: "",
    year: "",
    summary: "",
    built: [
      "",
    ],
    stack: ["", ""],
    specs: [],
    images: [
      { src: "images/my-project/screenshot.png", caption: "Main screen" },
    ],
    links: [
      { type: "github", url: "https://github.com/..." },
      { type: "demo", url: "https://..." },
    ],
  },
-------------------------------------------------------------------------------------
*/
