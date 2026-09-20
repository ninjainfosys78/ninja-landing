import {
  Target,
  Handshake,
  Globe2,
  ShieldCheck,
  BadgeCheck,
  Eye,
  Heart,
  Zap,
  Lightbulb,
} from "lucide-react";
import type { TeamMember } from "@/lib/team";
import { isLeadershipRole } from "@/lib/team-groups";

export interface TimelineEntry {
  year: string;
  title: string;
  text: string;
}

// Static bilingual copy for the About page, kept out of the page component
// since it's pure data, not UI logic — the leadership and team lists are the
// only parts that are dynamic (sourced from DCM via teamMembers/teamGridMembers).
export function getAboutContent(
  language: "en" | "ne",
  teamMembers: TeamMember[],
  teamGridMembers: TeamMember[] = []
) {
  const mapMember = (m: TeamMember) => ({
    name: language === "en" ? m.name : m.name_ne || m.name,
    role: language === "en" ? m.role : m.role_ne || m.role,
    image: m.imageUrl || null,
    linkedinUrl: m.linkedinUrl ?? null,
    bio: language === "en" ? m.bio_en : m.bio_ne || m.bio_en,
  });

  // Anyone authored under DCM "leadership" is a leader by placement; role
  // keywords only promote people who were added to the general "team" list.
  const promoted = teamGridMembers.filter((m) => isLeadershipRole(m.role));
  const leaders = [...teamMembers, ...promoted].map(mapMember);
  const team = teamGridMembers.filter((m) => !isLeadershipRole(m.role)).map(mapMember);

  return language === "en"
    ? {
        who: "Who we are",
        heroTitle: "ABOUT US",
        brand: "NINJA INFOSYS",
        whoDesc:
          "Ninja Infosys is an IT technical solution provider. Our dedicated technical professionals offer our clients services in the field of IT Consultancy, Software Development, Web/Mobile Application Development, Project-based solutions and IT System Maintenance. Our mission from the very first day has been to establish professional relationship with our clients, to provide effective and reliable information technology solutions for their need.",
        coreTitle: "Our Core",
        features: [
          {
            icon: Handshake,
            title: "Collaboration",
            desc: "Working closely with partners",
          },
          {
            icon: Globe2,
            title: "Global research",
            desc: "Multi-region delivery",
          },
          {
            icon: ShieldCheck,
            title: "Trust & Security",
            desc: "Secure, reliable solutions",
          },
          {
            icon: BadgeCheck,
            title: "Quality",
            desc: "Standards & Certifications",
          },
        ],
        core: [
          {
            icon: Eye,
            title: "Our purpose",
            body: "Build trustworthy software that helps teams move faster, operate safely, and deliver real outcomes—without the drama.",
          },
          {
            icon: Target,
            title: "Our mission",
            body: "Enable enterprises with modern engineering practices and small, craft-focused teams—shipping measurable value, iteratively.",
          },
          {
            icon: Heart,
            title: "Our values",
            body: "Craft and clarity, integrity and ownership, partner mindset, accessibility and security by default, and continuous improvement.",
          },
        ],
        storyTitle: "Our story",
        timeline: [
          {
            year: "2016",
            title: "Humble start",
            text: "Founded by a small group of passionate engineers, Ninja Infosys began as a specialized studio focused on building high-performance web systems. Our early focus was on establishing a foundation of technical excellence and a partner-first mindset that still drives us today.",
          },
          {
            year: "2018",
            title: "First Fortune 500",
            text: "A significant milestone as we partnered with our first Fortune 500 client. We successfully modernized and scaled critical payment and risk platforms, introducing streamlined developer experiences and robust CI/CD pipelines into complex enterprise environments.",
          },
          {
            year: "2020",
            title: "Platform practice",
            text: "We formally launched our Platform Engineering practice, developing internal accelerators that allow clients to ship software faster and more safely. Our focus shifted towards site reliability (SRE) and automated cloud-native infrastructure at scale.",
          },
          {
            year: "2023",
            title: "Data & AI",
            text: "Expanding into the frontier of pragmatic AI, we integrated retrieval-augmented generation (RAG) and specialized evaluation frameworks into shipping products. We help partners navigate the complexity of AI safety and real-world implementation.",
          },
          {
            year: "2025",
            title: "Global footprint",
            text: "Today, Ninja Infosys serves as a global technical partner with a presence across multiple regions. While our reach has expanded, we maintain our 'small-team' DNA—prioritizing engineering craft, deep ownership, and measurable business outcomes.",
          },
        ],
        principlesTitle: "Engineering Principles",
        principles: [
          { icon: Zap, title: "Automation First", body: "We eliminate toil. If a task is repeatable, it is automated. This ensures consistency and frees our engineers to solve creative problems." },
          { icon: ShieldCheck, title: "Security by Default", body: "Security isn't a checkbox at the end—it's woven into every line of code we write and every architectural decision we make." },
          { icon: Lightbulb, title: "Pragmatic Innovation", body: "We don't chase hype. We apply new technologies like AI and Cloud-Native patterns only when they drive real business outcomes." }
        ],
        leadershipTitle: "Our Team",
        leaders,
        teamEyebrow: "Our Team",
        teamSubtitle: "Meet the developers and support specialists whose passion and commitment to excellence fuel our success.",
        team,
      }
    : {
        who: "हामी को हौं",
        heroTitle: "हाम्रो बारेमा",
        brand: "निन्जा इन्फोसिस",
        whoDesc:
          "निन्जा इन्फोसिस एक आईटी प्राविधिक समाधान प्रदायक हो। हाम्रा समर्पित प्राविधिक पेशेवरहरूले ग्राहकहरूलाई आईटी परामर्श, सफ्टवेयर विकास, वेब/मोबाइल एप विकास, परियोजना-आधारित समाधान र आईटी प्रणाली मर्मतसम्भारमा सेवाहरू प्रदान गर्दछन्। सुरुदेखि नै हाम्रो लक्ष्य ग्राहकहरूसँग व्यावसायिक सम्बन्ध स्थापन गरी प्रभावकारी र भरपर्दो सूचना प्रविधि समाधानहरू उपलब्ध गराउनु हो।",
        features: [
          {
            icon: Handshake,
            title: "सहकार्य",
            desc: "साझेदारहरूसँग नजिकबाट काम गरिन्छ",
          },
          {
            icon: Globe2,
            title: "वैश्विक शोध",
            desc: "बहु-क्षेत्रीय डेलिभरी",
          },
          {
            icon: ShieldCheck,
            title: "विश्वास र सुरक्षा",
            desc: "सुरक्षित, भरपर्दो समाधान",
          },
          {
            icon: BadgeCheck,
            title: "गुणस्तर",
            desc: "मानक र प्रमाणपत्रहरू",
          },
        ],
        coreTitle: "हाम्रो मूल",
        core: [
          {
            icon: Eye,
            title: "हाम्रो उद्देश्य",
            body: "विश्वासयोग्य सफ्टवेयर बनाउनु—जसले टिमलाई छिटो र सुरक्षित रूपमा काम गर्न मद्दत गर्छ र वास्तविक नतिजा दिन्छ।",
          },
          {
            icon: Target,
            title: "हाम्रो मिशन",
            body: "आधुनिक इन्जिनियरिङ अभ्यास र साना, कौशल केन्द्रित टोलीमार्फत क्रमिक रूपमा मापनयोग्य मूल्य डेलिभर गराउने।",
          },
          {
            icon: Heart,
            title: "हाम्रो मूल्यहरू",
            body: "कला र स्पष्टता, इमानदारी र स्वामित्व, साझेदारी सोच, पहुँचयोग्यता र सुरक्षा-पहिले, र निरन्तर सुधार।",
          },
        ],
        storyTitle: "हाम्रो कथा",
        timeline: [
          {
            year: "२०१६",
            title: "न्यानो सुरुवात",
            text: "उत्साही ईन्जिनियरहरूको एउटा सानो समूहद्वारा स्थापित, निन्जा इन्फोसिसले उच्च-कार्यक्षमता वेब प्रणालीहरू निर्माणमा केन्द्रित एक विशेष स्टुडियोको रूपमा आफ्नो यात्रा सुरु गर्यो।",
          },
          {
            year: "२०१८",
            title: "पहिलो फोर्च्यून ५००",
            text: "हामीले हाम्रो पहिलो 'फोर्च्यून ५००' ग्राहकसँग साझेदारी गर्दा यो एक महत्वपूर्ण उपलब्धि थियो। हामीले जटिल उद्यम वातावरणहरूमा आधुनिक विकासकर्ता अनुभवहरू र मजबुत प्रक्रियाहरू भित्र्याउँदै महत्वपूर्ण भुक्तानी र जोखिम प्लेटफर्महरूको आधुनिकीकरण गर्यौँ।",
          },
          {
            year: "२०२०",
            title: "प्लेटफर्म अभ्यास",
            text: "हामीले औपचारिक रूपमा हाम्रो 'प्लेटफर्म इन्जिनियरिङ' अभ्यास सुरु गर्यौँ। हाम्रो ध्यान साइट रिलायबिलिटी (SRE) र ठूला स्वचालित क्लाउड-नेटिभ पूर्वाधार निर्माणतर्फ केन्द्रित भयो, जसले ग्राहकहरूलाई सफ्टवेयर अझ छिटो र सुरक्षित रूपमा डेलिभर गर्न मद्दत गर्यो।",
          },
          {
            year: "२०२३",
            title: "डेटा र एआई",
            text: "व्यावहारिक एआईको क्षेत्रमा पाइला चाल्दै, हामीले उत्पादनहरूमा रिट्राइभल-अगमेन्टेड जेनेरेशन (RAG) र विशेष मूल्याङ्कन ढाँचाहरू एकीकृत गर्यौँ। हामी हाम्रा साझेदारहरूलाई एआई सुरक्षा र वास्तविक कार्यान्वयनको जटिलताहरू बुझ्न मद्दत गर्छौं।",
          },
          {
            year: "२०२५",
            title: "वैश्विक उपस्थिति",
            text: "समान सानो-टिम डीएनए र कला मानकसहित बहु-क्षेत्रीय डेलिभरी।",
          },
        ],
        principlesTitle: "इन्जिनियरिङ सिद्धान्तहरू",
        principles: [
          { icon: Zap, title: "स्वचालन पहिलो", body: "हामी कठिन कामहरू हटाउँछौं। यदि कुनै कार्य दोहोरिने खालको छ भने, त्यसलाई स्वचालित बनाइन्छ।" },
          { icon: ShieldCheck, title: "पूर्वनिर्धारित सुरक्षा", body: "सुरक्षा अन्तिममा गरिने चेकबक्स होइन—यो हामीले लेख्ने कोड र हरेक वास्तुकला निर्णयमा बुनिएको हुन्छ।" },
          { icon: Lightbulb, title: "व्यावहारिक नवाचार", body: "हामी केवल चर्चाको पछि लाग्दैनौं। हामी एआई जस्ता नयाँ प्रविधिहरू प्रयोग गर्छौं जसले वास्तविक नतिजा दिन्छ।" }
        ],
        leadershipTitle: "हाम्रो टिम",
        leaders,
        teamEyebrow: "हाम्रो टिम",
        teamSubtitle: "उत्कृष्टताप्रति समर्पित हाम्रा विकासकर्ता र सहयोग टिमलाई भेट्नुहोस्, जसको लगनले हाम्रो सफलतालाई अघि बढाउँछ।",
        team,
      };
}
