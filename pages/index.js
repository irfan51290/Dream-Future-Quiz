import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';

const QUESTIONS_RAW = [
  {
    q: "Your dream home in SG looks like…",
    options: [
      { label: "A sleek condo in town — near everything, rooftop pool, the works", emoji: "🏢", scores: { kiasu: 2, work: 1, atas: 3, chill: 0, family: 1, yolo: 1, hustle: 2, comfort: 1 } },
      { label: "A spacious landed house in the East — garden, dog, quiet street", emoji: "🏠", scores: { kiasu: 1, work: 1, atas: 2, chill: 1, family: 3, yolo: 0, hustle: 2, comfort: 2 } },
      { label: "A cozy HDB in a mature estate — hawker food downstairs, real community", emoji: "🌇", scores: { kiasu: 1, work: 1, atas: 0, chill: 3, family: 2, yolo: 0, hustle: 1, comfort: 3 } },
      { label: "Honestly? Somewhere overseas — Bali, Melbourne, Lisbon, anywhere", emoji: "✈️", scores: { kiasu: 0, work: 0, atas: 1, chill: 2, family: 0, yolo: 3, hustle: 1, comfort: 0 } },
    ],
  },
  {
    q: "You wake up on your dream Saturday. What's happening?",
    options: [
      { label: "Brunch at a cafe, then shopping at Orchard", emoji: "☕", scores: { kiasu: 0, work: 0, atas: 3, chill: 1, family: 0, yolo: 2, hustle: 0, comfort: 2 } },
      { label: "Hike at MacRitchie, then a beach day at East Coast", emoji: "🌿", scores: { kiasu: 0, work: 0, atas: 0, chill: 3, family: 1, yolo: 2, hustle: 0, comfort: 1 } },
      { label: "Lazy morning at home with family, home-cooked lunch", emoji: "🏡", scores: { kiasu: 0, work: 0, atas: 0, chill: 2, family: 3, yolo: 0, hustle: 0, comfort: 3 } },
      { label: "Working on my side project / catching up on work", emoji: "💻", scores: { kiasu: 2, work: 3, atas: 0, chill: 0, family: 0, yolo: 0, hustle: 3, comfort: 0 } },
    ],
  },
  {
    q: "Your dream job feels like…",
    options: [
      { label: "Running my own business — I'm the boss, I call the shots", emoji: "💼", scores: { kiasu: 2, work: 2, atas: 2, chill: 0, family: 1, yolo: 1, hustle: 3, comfort: 0 } },
      { label: "A senior title at a top firm — respected, well-paid, impressive", emoji: "🏦", scores: { kiasu: 3, work: 3, atas: 3, chill: 0, family: 1, yolo: 0, hustle: 1, comfort: 0 } },
      { label: "Something chill — steady pay, work-life balance, zero drama", emoji: "🌴", scores: { kiasu: 0, work: 0, atas: 0, chill: 3, family: 2, yolo: 1, hustle: 0, comfort: 3 } },
      { label: "Remote / freelance — work from anywhere, total freedom", emoji: "🌊", scores: { kiasu: 0, work: 0, atas: 1, chill: 2, family: 0, yolo: 3, hustle: 2, comfort: 1 } },
    ],
  },
  {
    q: "10 years from now, your ideal family setup is…",
    options: [
      { label: "Married with 2-3 kids, the full family chapter", emoji: "👨‍👩‍👧‍👦", scores: { kiasu: 2, work: 1, atas: 1, chill: 1, family: 3, yolo: 0, hustle: 1, comfort: 2 } },
      { label: "Partnered, maybe one kid, maybe none — quality over quantity", emoji: "💑", scores: { kiasu: 1, work: 2, atas: 2, chill: 2, family: 1, yolo: 1, hustle: 1, comfort: 2 } },
      { label: "Solo and thriving — pets, passions, peace", emoji: "🧘", scores: { kiasu: 0, work: 1, atas: 1, chill: 3, family: 0, yolo: 2, hustle: 1, comfort: 2 } },
      { label: "Honestly unsure — let life surprise me", emoji: "🤷", scores: { kiasu: 0, work: 0, atas: 0, chill: 2, family: 0, yolo: 3, hustle: 0, comfort: 0 } },
    ],
  },
  {
    q: "It's 10pm on a Wednesday. You're most likely…",
    options: [
      { label: "Still replying work emails / finishing that deck", emoji: "📧", scores: { kiasu: 3, work: 3, atas: 1, chill: 0, family: 0, yolo: 0, hustle: 2, comfort: 0 } },
      { label: "On the couch with Netflix and a snack", emoji: "🛋️", scores: { kiasu: 0, work: 0, atas: 0, chill: 2, family: 1, yolo: 0, hustle: 0, comfort: 3 } },
      { label: "Working on a side project / researching investments", emoji: "📊", scores: { kiasu: 2, work: 1, atas: 0, chill: 0, family: 0, yolo: 0, hustle: 3, comfort: 0 } },
      { label: "Out with friends / booking my next trip", emoji: "🍻", scores: { kiasu: 0, work: 0, atas: 2, chill: 1, family: 0, yolo: 3, hustle: 0, comfort: 0 } },
    ],
  },
  {
    q: "A friend asks how you're doing. Your honest answer is…",
    options: [
      { label: "\"Busy sia, so many things to do\" (said with pride tbh)", emoji: "⚡", scores: { kiasu: 3, work: 3, atas: 1, chill: 0, family: 1, yolo: 0, hustle: 2, comfort: 0 } },
      { label: "\"Chill lah, all good\" — and you mean it", emoji: "😌", scores: { kiasu: 0, work: 0, atas: 0, chill: 3, family: 1, yolo: 1, hustle: 0, comfort: 3 } },
      { label: "\"Stressed but exciting stuff happening\" — big plans in motion", emoji: "🔥", scores: { kiasu: 2, work: 2, atas: 2, chill: 0, family: 0, yolo: 1, hustle: 3, comfort: 0 } },
      { label: "\"Just living life one day at a time\" — vibes only", emoji: "🌈", scores: { kiasu: 0, work: 0, atas: 1, chill: 2, family: 0, yolo: 3, hustle: 0, comfort: 1 } },
    ],
  },
  {
    q: "Unexpected $10,000 lands in your account. First instinct?",
    options: [
      { label: "Straight into savings / CPF top-up / investments", emoji: "💰", scores: { kiasu: 3, work: 2, atas: 0, chill: 1, family: 2, yolo: 0, hustle: 3, comfort: 1 } },
      { label: "Book that dream trip I've been eyeing", emoji: "✈️", scores: { kiasu: 0, work: 0, atas: 2, chill: 1, family: 0, yolo: 3, hustle: 0, comfort: 1 } },
      { label: "Upgrade something nice — new bag, watch, gadget", emoji: "🛍️", scores: { kiasu: 0, work: 1, atas: 3, chill: 1, family: 0, yolo: 2, hustle: 0, comfort: 2 } },
      { label: "Give some to family, save the rest", emoji: "🤝", scores: { kiasu: 2, work: 1, atas: 0, chill: 1, family: 3, yolo: 0, hustle: 1, comfort: 2 } },
    ],
  },
  {
    q: "Your biggest life fear, if you're being real?",
    options: [
      { label: "Falling behind / being left out / not making it", emoji: "😰", scores: { kiasu: 3, work: 3, atas: 2, chill: 0, family: 1, yolo: 0, hustle: 2, comfort: 0 } },
      { label: "Not being able to take care of the people I love", emoji: "💔", scores: { kiasu: 1, work: 1, atas: 0, chill: 0, family: 3, yolo: 0, hustle: 1, comfort: 2 } },
      { label: "Waking up at 60 realising I never actually lived", emoji: "🕰️", scores: { kiasu: 0, work: 0, atas: 1, chill: 1, family: 0, yolo: 3, hustle: 0, comfort: 0 } },
      { label: "Losing my peace / comfort / stability", emoji: "🏠", scores: { kiasu: 0, work: 0, atas: 0, chill: 2, family: 2, yolo: 0, hustle: 0, comfort: 3 } },
    ],
  },
  {
    q: "Your relationship with money right now?",
    options: [
      { label: "Actively tracking, budgeting, growing it — I have a plan", emoji: "📈", scores: { kiasu: 3, work: 2, atas: 0, chill: 0, family: 2, yolo: 0, hustle: 3, comfort: 0 } },
      { label: "Earn, spend, vibe — I don't think about it too much", emoji: "💸", scores: { kiasu: 0, work: 0, atas: 2, chill: 2, family: 0, yolo: 3, hustle: 0, comfort: 2 } },
      { label: "Saving more than spending, but not really investing", emoji: "🐷", scores: { kiasu: 1, work: 1, atas: 0, chill: 2, family: 2, yolo: 0, hustle: 0, comfort: 3 } },
      { label: "Honestly? A bit anxious. I know I should be doing more", emoji: "😬", scores: { kiasu: 2, work: 2, atas: 2, chill: 1, family: 2, yolo: 1, hustle: 1, comfort: 1 } },
    ],
  },
  {
    q: "In the last 6 months, have you actually done something to move closer to your dream life?",
    options: [
      { label: "Yes — I've got a plan and I'm executing it", emoji: "✅", scores: { kiasu: 3, work: 2, atas: 1, chill: 0, family: 1, yolo: 0, hustle: 3, comfort: 0 } },
      { label: "Kind of — small things, but not super consistent", emoji: "🟡", scores: { kiasu: 1, work: 1, atas: 2, chill: 2, family: 2, yolo: 1, hustle: 1, comfort: 2 } },
      { label: "I keep meaning to, but life gets in the way", emoji: "🌀", scores: { kiasu: 0, work: 2, atas: 2, chill: 1, family: 2, yolo: 1, hustle: 0, comfort: 2 } },
      { label: "Not really — I'm still figuring out what the dream even is", emoji: "🌫️", scores: { kiasu: 0, work: 1, atas: 1, chill: 2, family: 0, yolo: 2, hustle: 0, comfort: 1 } },
    ],
  },
  {
    q: "Pick your dream \"I've made it\" moment:",
    options: [
      { label: "Hitting a specific net worth number (you know the number)", emoji: "💎", scores: { kiasu: 3, work: 2, atas: 2, chill: 0, family: 1, yolo: 0, hustle: 3, comfort: 0 } },
      { label: "Taking a 3-month break with zero guilt about money", emoji: "🏖️", scores: { kiasu: 0, work: 1, atas: 1, chill: 2, family: 0, yolo: 3, hustle: 1, comfort: 2 } },
      { label: "Paying for my parents'/kids' big moments without stress", emoji: "👨‍👩‍👧", scores: { kiasu: 1, work: 1, atas: 0, chill: 1, family: 3, yolo: 0, hustle: 1, comfort: 1 } },
      { label: "Quitting my job on my own terms, whenever I want", emoji: "🗝️", scores: { kiasu: 1, work: 1, atas: 1, chill: 2, family: 0, yolo: 2, hustle: 3, comfort: 1 } },
    ],
  },
  {
    q: "Biggest thing between you and your dream life right now?",
    options: [
      { label: "Money / not earning enough yet", emoji: "💸", scores: { kiasu: 2, work: 2, atas: 2, chill: 1, family: 2, yolo: 1, hustle: 2, comfort: 1 } },
      { label: "Time — too busy, life moves too fast", emoji: "⏰", scores: { kiasu: 2, work: 3, atas: 1, chill: 1, family: 2, yolo: 0, hustle: 2, comfort: 0 } },
      { label: "Clarity — not sure what the actual plan is", emoji: "🧭", scores: { kiasu: 0, work: 1, atas: 1, chill: 2, family: 1, yolo: 2, hustle: 0, comfort: 2 } },
      { label: "Discipline — I know what to do, just not doing it", emoji: "🎯", scores: { kiasu: 1, work: 1, atas: 2, chill: 2, family: 1, yolo: 2, hustle: 0, comfort: 2 } },
    ],
  },
];

const RESULTS = {
  kiasu: { name: "The Kiasu Climber", stamp: "KIASU", tagline: "Always one step ahead — because falling behind is not an option.", body: "You are the person everyone else low-key compares themselves to. You check your CPF balance more often than most people check their weight, you've already Googled the BTO prices in three estates you don't even want to live in, and 'just in case' is basically your life philosophy. You don't want to lose — not to your cousins, not to your JC batch, not to that classmate who just posted their new condo on Instagram. People call you kiasu, but they also call you when they need real advice, because somehow you've already researched it. Underneath all that planning is something softer though: you just really, really don't want to let yourself down.", dream: "Being the one your family and friends look up to — financially secure, quietly winning, already 10 steps into a plan while others are still figuring out what to do.", blindspot: "You're so busy optimizing that you sometimes forget to actually LIVE. Kiasu Climbers often hit 45 with the numbers but no memories — and the people they were trying to protect drifted away while they were grinding. The goal isn't to stop winning. It's to make sure the life you're building has you IN it.", need: "A clear, written plan that shows you're already winning — so you can stop second-guessing, stop over-optimizing, and finally enjoy what you've built.", color: "#c73e2e", accent: "#f5d547" },
  work: { name: "The Workaholic", stamp: "GRIND", tagline: "Your job isn't what you do — it's who you are. For better and worse.", body: "You are the person who answers emails at 11pm and somehow feels guilty when you don't. Monday anxiety starts Sunday afternoon. You've canceled plans 'because of work' more times than you can count, and the scary part is — you kind of like being the one who's always needed. Your identity and your job have fused together at this point, and while you complain about the hours, a quiet part of you is proud of them. You tell yourself you'll slow down once you hit the next milestone, but that milestone keeps moving. The truth? You're not actually addicted to work — you're addicted to mattering, to being indispensable, to the feeling that you're building something.", dream: "Reaching a point where your work finally PAYS you back in time, freedom, and options — not just title bumps and higher salaries you never get to spend.", blindspot: "Workaholics are the most likely to wake up at 50 with an impressive LinkedIn and an empty calendar of actual memories. The career gives you money, but without a parallel plan, that money just becomes more work — more lifestyle creep, more obligations, more golden handcuffs. The exit ramp doesn't build itself.", need: "A system that turns your income into actual freedom — so the grind has a finish line, not just a next level.", color: "#2c3e50", accent: "#e67e22" },
  atas: { name: "The Atas Aspirer", stamp: "LUXE", tagline: "You believe in living beautifully — even if the math doesn't always agree.", body: "You are the friend who always knows the good cafe, the new omakase, the rooftop bar everyone Instagrams. Your standards are high, your taste is sharper than most people's, and you're not ashamed of it — you worked hard, you deserve nice things, and life is too short for bad coffee. But let's be real: the lifestyle is expensive, and sometimes your salary and your standards are not quite on the same page. You tell yourself it's fine because you've got time, and also because looking like you have it together IS part of having it together. You're not materialistic — you genuinely appreciate beauty, quality, experience. You just also really don't want to be the one who shows up to dinner at the 'cheap' place.", dream: "A life where the lifestyle matches the aesthetic — where you're not stretching, not performing, just genuinely living beautifully without the quiet financial stress underneath.", blindspot: "Atas Aspirers often have amazing Instagram feeds and empty emergency funds. The lifestyle eats faster than the income grows, and 'I'll catch up later' becomes a 15-year habit. The fix isn't becoming boring — it's building the boring money foundation underneath so the fun stuff becomes actually guilt-free.", need: "A plan that funds the lifestyle you actually want AND builds real wealth underneath — so it's not all running on vibes.", color: "#6b2d5c", accent: "#f4c95d" },
  chill: { name: "The Chill Singaporean", stamp: "CHILL", tagline: "Everyone's stressing, and somehow you figured out you don't have to.", body: "You are the rare Singaporean who actually managed to opt out of the kiasu race — or at least most of it. You're not lazy, you're not unambitious, you just don't see the point in destroying yourself for things that don't actually matter to you. You value your time, your peace, your relationships, and you're willing to earn less to protect them. Friends call you grounded, some call you too relaxed, and your parents occasionally worry you're not 'hungry' enough. But you're the one who still sleeps well at night, still has hobbies, still laughs easily. You're not against money — you just refuse to let it run your life.", dream: "A life that stays exactly this chill — but with enough financial cushion that the chill is actually sustainable, not just 'fine for now.'", blindspot: "Chill Singaporeans are the most likely to mistake 'no stress' for 'no plan.' The relaxed years feel amazing until something hits — a parent's health, a job loss, inflation — and suddenly the chill was built on nothing but hope.", need: "A low-maintenance, automated financial setup that protects the lifestyle you love without making you turn into someone you're not.", color: "#2d5a3d", accent: "#f5b841" },
  family: { name: "The Family First", stamp: "FAMILY", tagline: "Your life has a mission — and it's not about you.", body: "You are the person whose decisions all quietly filter through one question: 'Will this be good for my family?' Your parents, your partner, your kids — or the kids you'll have one day — they're the real main character of your life story. You skip things you want for things they need. You worry about them in ways they don't even know. When people ask what you want in life, the first thought isn't about you at all, it's about them being okay. It's a beautiful way to live, and also — exhausting. Because the love is endless but the bandwidth isn't, and sometimes you forget that YOU are also someone who needs taking care of.", dream: "Your family genuinely taken care of — your parents in comfortable retirement, your kids having options you didn't, and no one in the family ever stressed about money because of you.", blindspot: "Family-First people are the most likely to sacrifice themselves into a corner. You protect everyone else so hard that your own retirement, your own health, your own dreams quietly get put last — for 30 years straight. Your family doesn't actually want that. They want you around, whole, happy — not just provided for.", need: "A structured plan that takes care of them AND you — so the love you give doesn't come at the cost of your own future.", color: "#8b3a3a", accent: "#e8b547" },
  yolo: { name: "The YOLO Adventurer", stamp: "YOLO", tagline: "Life is short, the world is big, and you refuse to waste either.", body: "You are the one with 50 stamps in your passport and a camera roll that makes everyone jealous. 'Money can earn back, time cannot' is basically your religion. You've chosen Bali over bonus season, quit a job to travel, said yes to the trip even when the timing was bad — and you don't regret any of it. People who don't get you think you're reckless; people who DO get you think you're living more in one year than they do in ten. The truth is somewhere in between. You're not avoiding responsibility, you just refuse to postpone living until some mythical 'later' that never comes. You'd rather be broke and full than rich and numb.", dream: "A life that never stops being an adventure — more trips, more stories, more yes, with enough money quietly in the background that you never have to say no to the experiences that matter.", blindspot: "YOLO Adventurers have the best stories and the worst emergency funds. It all feels fine at 28, 32, even 38 — and then suddenly you're 45, still trying to 'figure it out,' and the freedom you thought you were buying turned into a slow trap.", need: "A hands-off financial setup that runs in the background — so you can keep saying yes to adventures without waking up exposed later.", color: "#d97706", accent: "#06b6d4" },
  hustle: { name: "The Secret Hustler", stamp: "HUSTLE", tagline: "Day job, side hustle, crypto wallet, that Notion with 50 business ideas. You're building.", body: "You are the person with three tabs open, a side project nobody knows about yet, and a brain that literally cannot stop generating ideas. You have a full-time job, sure, but you also have the 'real thing' you're building on the side — and you know deep down, one day, the side thing becomes the main thing. You're not doing it for the flex. You're doing it because you genuinely believe you can build something, because a regular job will never be enough, because you want your future self to look back and know you actually tried. It's lonely sometimes — most people don't get it, don't want it, or secretly resent it — but you'd rather be tired building your own thing than comfortable building someone else's.", dream: "The side thing becoming the main thing — leaving the day job on your own terms, owning your time, and finally proving (mostly to yourself) that you could actually do it.", blindspot: "Hustlers often invest everything INTO the hustle and nothing into the boring foundation underneath. One bad year, one failed launch, one unexpected life event, and the whole thing collapses — not because the hustle was bad, but because there was no safety net.", need: "A protective base layer of wealth that runs separately from your hustle — so your bets can be bold because your foundation is solid.", color: "#1e3a8a", accent: "#fbbf24" },
  comfort: { name: "The Comfort Seeker", stamp: "COMFY", tagline: "You've earned your peace, and you'd like to keep it, thank you very much.", body: "You are the person who has quietly figured out what makes you happy and has zero interest in apologising for it. It might be a good book, a quiet evening in, your exact routine, your same-same hawker order, a show you've rewatched five times. You're not trying to climb a mountain — you already found a pretty nice hill and it's cozy up here. People sometimes mistake this for lack of ambition, but they're wrong. You're ambitious about the RIGHT things: your peace, your wellbeing, your relationships, your small daily joys. You just refuse to trade them for things that society says matter more. That takes more self-knowledge than most people have.", dream: "This exact life, but protected — your peace stays your peace, no sudden emergencies, no financial shocks, just quiet continuity for decades.", blindspot: "Comfort Seekers are the most likely to confuse 'stable' with 'safe.' A cushy routine today is great, but it's being quietly eaten by inflation, rising medical costs, and a retirement that's 25-30 years long.", need: "A simple, automated setup that preserves your current peace — protects what you have, grows what you've saved, and keeps your life feeling this comfortable for decades.", color: "#5e3023", accent: "#d4a373" },
};

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function Home() {
  const [stage, setStage] = useState('landing');
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState({ kiasu: 0, work: 0, atas: 0, chill: 0, family: 0, yolo: 0, hustle: 0, comfort: 0 });
  const [result, setResult] = useState(null);
  const [form, setForm] = useState({ name: '', phone: '', time: '' });
  const [animKey, setAnimKey] = useState(0);
  const [seed, setSeed] = useState(0);

  const questions = useMemo(() => {
    const shuffled = shuffle(QUESTIONS_RAW);
    return shuffled.map(q => ({ ...q, options: shuffle(q.options) }));
  }, [seed]);

  useEffect(() => { setAnimKey(k => k + 1); }, [stage, currentQ]);

  const handleAnswer = (option) => {
    const newScores = { ...scores };
    Object.keys(option.scores).forEach(k => { newScores[k] += option.scores[k]; });
    setScores(newScores);
    if (currentQ + 1 >= questions.length) {
      const top = Object.keys(newScores).reduce((a, b) => newScores[a] > newScores[b] ? a : b);
      setResult(top);
      setTimeout(() => setStage('result'), 400);
    } else {
      setCurrentQ(currentQ + 1);
    }
  };

  const restart = () => {
    setStage('landing'); setCurrentQ(0);
    setScores({ kiasu: 0, work: 0, atas: 0, chill: 0, family: 0, yolo: 0, hustle: 0, comfort: 0 });
    setResult(null); setForm({ name: '', phone: '', time: '' });
    setSeed(s => s + 1);
  };

  const submitBooking = async () => {
    if (!form.name || !form.phone || !form.time) return;
    try {
      const phoneFormatted = form.phone.startsWith('+') ? form.phone : '+65' + form.phone.replace(/\D/g, '');
      await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: phoneFormatted,
          archetype: result ? RESULTS[result].name : '',
          time: form.time,
        })
      });
    } catch (e) {
      console.error('Airtable submission error:', e);
    }
    setStage('booked');
  };

  const kopiBrown = '#3a2419', kopiMid = '#6b4530', cream = '#f5e6c8', creamLight = '#faf0dc';
  const kopitiamGreen = '#2d5a3d', accentRed = '#c73e2e', accentYellow = '#e8b547';
  const r = result ? RESULTS[result] : null;
  const resultColor = r ? r.color : kopitiamGreen;
  const resultAccent = r ? r.accent : accentYellow;

  const tileBar = `repeating-linear-gradient(90deg, ${kopitiamGreen} 0 24px, ${cream} 24px 28px, ${accentYellow} 28px 40px, ${cream} 40px 44px, ${accentRed} 44px 56px, ${cream} 56px 60px)`;

  return (
    <>
      <Head>
        <title>Build Your Dream Future — The Singaporean Quiz</title>
        <meta name="description" content="12 questions. 8 results. Find out which kind of Singaporean you really are." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bree+Serif&family=Oswald:wght@400;500;600;700&family=Caveat:wght@700&family=Rubik+Mono+One&display=swap" rel="stylesheet" />
      </Head>
      <style>{`
        * { box-sizing: border-box; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes stampIn { 0% { opacity:0; transform:scale(3) rotate(-15deg); } 60% { opacity:1; transform:scale(0.9) rotate(-8deg); } 100% { opacity:1; transform:scale(1) rotate(-5deg); } }
        @keyframes slideIn { from { opacity:0; transform:translateX(-20px); } to { opacity:1; transform:translateX(0); } }
        @keyframes bounce { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }
        @keyframes steam { 0%{opacity:0;transform:translateY(0) scale(1);} 50%{opacity:0.6;} 100%{opacity:0;transform:translateY(-30px) scale(1.5);} }
        .fade-up{animation:fadeUp 0.5s ease-out both;}
        .slide-in{animation:slideIn 0.4s ease-out both;}
        .stamp-in{animation:stampIn 0.8s cubic-bezier(0.34,1.56,0.64,1) both;}
        .char-bounce{animation:bounce 2.8s ease-in-out infinite;}
        .steam-1{animation:steam 2s ease-out infinite;}
        .steam-2{animation:steam 2s ease-out infinite 0.6s;}
        .steam-3{animation:steam 2s ease-out infinite 1.2s;}
        .opt-btn:hover{background:${kopitiamGreen}!important;color:${cream}!important;transform:translateY(-3px) rotate(-0.5deg);box-shadow:6px 6px 0 ${kopiBrown};}
        .primary-btn:hover{transform:translateY(-2px);box-shadow:6px 6px 0 ${kopiBrown};}
        input:focus,select:focus{outline:none;border-color:${kopitiamGreen}!important;}
      `}</style>

      <div style={{ minHeight:'100vh', background:`radial-gradient(ellipse at top left,rgba(232,181,71,0.15) 0%,transparent 50%),repeating-linear-gradient(45deg,${creamLight} 0px,${creamLight} 2px,transparent 2px,transparent 20px),${cream}`, fontFamily:"'Bree Serif',Georgia,serif", color:kopiBrown, padding:'20px 16px', position:'relative' }}>
        <div style={{position:'absolute',top:0,left:0,width:'100%',height:'8px',background:tileBar}}/>
        <div style={{position:'absolute',bottom:0,left:0,width:'100%',height:'8px',background:tileBar}}/>

        <div style={{maxWidth:640,margin:'0 auto',position:'relative'}}>

          {/* LANDING */}
          {stage==='landing' && (
            <div key={animKey} className="fade-up" style={{textAlign:'center',padding:'40px 0'}}>
              <div style={{background:kopitiamGreen,border:`6px solid ${kopiBrown}`,padding:'8px',marginBottom:32,boxShadow:`8px 8px 0 ${kopiBrown}`,transform:'rotate(-1deg)'}}>
                <div style={{border:`2px dashed ${cream}`,padding:'28px 20px',position:'relative'}}>
                  <div style={{position:'absolute',top:-24,left:'50%',transform:'translateX(-50%)',display:'flex',gap:6}}>
                    <div className="steam-1" style={{width:3,height:20,background:cream,borderRadius:2,opacity:0.5}}/>
                    <div className="steam-2" style={{width:3,height:24,background:cream,borderRadius:2,opacity:0.5}}/>
                    <div className="steam-3" style={{width:3,height:20,background:cream,borderRadius:2,opacity:0.5}}/>
                  </div>
                  <div style={{fontFamily:"'Caveat',cursive",fontSize:22,color:accentYellow,letterSpacing:2,marginBottom:4}}>~ which one are you? ~</div>
                  <h1 style={{fontFamily:"'Rubik Mono One',sans-serif",fontSize:'clamp(32px,7vw,48px)',color:cream,margin:'8px 0',lineHeight:1,textShadow:`3px 3px 0 ${kopiBrown}`}}>BUILD YOUR<br/>DREAM<br/>FUTURE</h1>
                  <div style={{fontFamily:"'Oswald',sans-serif",fontSize:14,color:accentYellow,letterSpacing:4,marginTop:12,fontWeight:500}}>★  T H E   S I N G A P O R E A N   Q U I Z  ★</div>
                </div>
              </div>
              <div style={{background:creamLight,border:`2px dashed ${kopiMid}`,padding:'24px 20px',marginBottom:28,fontSize:17,lineHeight:1.6,transform:'rotate(0.5deg)',boxShadow:`4px 4px 0 rgba(58,36,25,0.15)`}}>
                <p style={{margin:0}}>12 questions. 8 possible results.<br/>We'll tell you exactly which kind of Singaporean you are.</p>
                <p style={{fontFamily:"'Caveat',cursive",fontSize:22,color:accentRed,margin:'12px 0 0',transform:'rotate(-2deg)'}}>( warning: uncomfortably accurate 👀 )</p>
              </div>
              <button className="primary-btn" onClick={()=>setStage('quiz')} style={{background:accentRed,color:cream,border:`4px solid ${kopiBrown}`,padding:'18px 48px',fontFamily:"'Oswald',sans-serif",fontSize:22,fontWeight:700,letterSpacing:3,cursor:'pointer',boxShadow:`4px 4px 0 ${kopiBrown}`,transition:'all 0.15s',textTransform:'uppercase'}}>▸ Let's Go</button>
              <div style={{marginTop:32,fontFamily:"'Caveat',cursive",fontSize:18,color:kopiMid}}>🍜 2,847 Singaporeans played this week 🍜</div>
            </div>
          )}

          {/* QUIZ */}
          {stage==='quiz' && (
            <div style={{padding:'20px 0'}}>
              <div style={{background:cream,border:`3px solid ${kopiBrown}`,padding:'14px 18px',marginBottom:24,display:'flex',justifyContent:'space-between',alignItems:'center',fontFamily:"'Oswald',sans-serif",boxShadow:`3px 3px 0 ${kopiBrown}`,flexWrap:'wrap',gap:8}}>
                <div style={{fontSize:13,letterSpacing:2,color:kopiMid}}>ORDER CHIT № {String(currentQ+1).padStart(2,'0')} / {String(questions.length).padStart(2,'0')}</div>
                <div style={{display:'flex',gap:3,flexWrap:'wrap'}}>
                  {questions.map((_,i)=>(
                    <div key={i} style={{width:10,height:10,background:i<=currentQ?kopitiamGreen:'transparent',border:`2px solid ${kopiBrown}`,transform:'rotate(45deg)',transition:'all 0.3s'}}/>
                  ))}
                </div>
              </div>
              <div key={animKey} className="fade-up">
                <h2 style={{fontFamily:"'Rubik Mono One',sans-serif",fontSize:'clamp(22px,5vw,30px)',color:kopiBrown,lineHeight:1.25,marginBottom:28,textAlign:'center',padding:'0 8px'}}>{questions[currentQ].q}</h2>
                <div style={{display:'flex',flexDirection:'column',gap:14}}>
                  {questions[currentQ].options.map((opt,i)=>(
                    <button key={i} className="opt-btn slide-in" onClick={()=>handleAnswer(opt)} style={{background:cream,color:kopiBrown,border:`3px solid ${kopiBrown}`,padding:'18px 20px',fontFamily:"'Bree Serif',serif",fontSize:16,cursor:'pointer',textAlign:'left',display:'flex',alignItems:'center',gap:16,boxShadow:`4px 4px 0 ${kopiBrown}`,transition:'all 0.2s',animationDelay:`${i*0.08}s`,lineHeight:1.35}}>
                      <span style={{fontSize:32,flexShrink:0}}>{opt.emoji}</span>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* RESULT */}
          {stage==='result' && r && (
            <div key={animKey} className="fade-up" style={{padding:'20px 0'}}>
              <div style={{background:resultColor,border:`6px solid ${kopiBrown}`,padding:'8px',marginBottom:24,boxShadow:`8px 8px 0 ${kopiBrown}`}}>
                <div style={{border:`2px dashed ${resultAccent}`,padding:'24px 20px 28px',textAlign:'center',position:'relative'}}>
                  <div className="stamp-in" style={{position:'absolute',top:16,right:12,border:`4px double ${resultAccent}`,padding:'6px 10px',fontFamily:"'Oswald',sans-serif",fontSize:10,fontWeight:700,letterSpacing:2,color:resultAccent,transform:'rotate(-5deg)',background:'rgba(255,255,255,0.1)',lineHeight:1.2}}>{r.stamp}<br/>VERIFIED</div>
                  <div style={{fontSize:72,marginBottom:8}}>
                    {result==='kiasu'?'🥢':result==='work'?'💼':result==='atas'?'🥂':result==='chill'?'🍺':result==='family'?'❤️':result==='yolo'?'✈️':result==='hustle'?'💡':'🛋️'}
                  </div>
                  <div style={{fontFamily:"'Caveat',cursive",fontSize:20,color:resultAccent,letterSpacing:2}}>you are…</div>
                  <h2 style={{fontFamily:"'Rubik Mono One',sans-serif",fontSize:'clamp(24px,5.5vw,32px)',color:cream,margin:'6px 0 14px',lineHeight:1.1,textShadow:`3px 3px 0 ${kopiBrown}`}}>{r.name.toUpperCase()}</h2>
                  <div style={{fontFamily:"'Caveat',cursive",fontSize:20,color:resultAccent,lineHeight:1.3,padding:'0 8px'}}>"{r.tagline}"</div>
                </div>
              </div>

              <div style={{background:creamLight,border:`3px solid ${kopiBrown}`,padding:'24px 22px',marginBottom:24,fontSize:16,lineHeight:1.65,boxShadow:`4px 4px 0 ${kopiBrown}`}}>
                <p style={{margin:'0 0 18px'}}>{r.body}</p>
                <div style={{borderTop:`2px dashed ${kopiMid}`,paddingTop:16,marginTop:16}}>
                  <div style={{fontFamily:"'Oswald',sans-serif",fontSize:13,letterSpacing:3,color:kopitiamGreen,fontWeight:600,marginBottom:6}}>▸ YOUR DREAM LIFE</div>
                  <p style={{margin:'0 0 16px'}}>{r.dream}</p>
                  <div style={{fontFamily:"'Oswald',sans-serif",fontSize:13,letterSpacing:3,color:accentRed,fontWeight:600,marginBottom:6}}>▸ YOUR BLIND SPOT</div>
                  <p style={{margin:'0 0 16px'}}>{r.blindspot}</p>
                  <div style={{fontFamily:"'Oswald',sans-serif",fontSize:13,letterSpacing:3,color:kopitiamGreen,fontWeight:600,marginBottom:6}}>▸ WHAT YOU TYPICALLY NEED</div>
                  <p style={{margin:0}}>{r.need}</p>
                </div>
              </div>

              <div style={{background:accentYellow,border:`4px solid ${kopiBrown}`,padding:'24px 22px',boxShadow:`6px 6px 0 ${kopiBrown}`,transform:'rotate(-0.5deg)'}}>
                <div style={{fontFamily:"'Caveat',cursive",fontSize:28,color:accentRed,textAlign:'center',marginBottom:6,transform:'rotate(-2deg)'}}>want a personalised roadmap?</div>
                <p style={{fontSize:15,color:kopiBrown,textAlign:'center',margin:'8px 0 20px',lineHeight:1.5}}>Free 20-min <b>"Future Blueprint"</b> session with a licensed consultant. They'll map out the 3 moves for a <b>{r.name}</b> like you.<br/><br/><span style={{fontSize:13,color:kopiMid}}>No sales pitch. No pressure. Just clarity.</span></p>
                <div style={{display:'flex',flexDirection:'column',gap:10}}>
                  <input type="text" placeholder="Your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={{padding:'14px 16px',border:`3px solid ${kopiBrown}`,background:cream,fontFamily:"'Bree Serif',serif",fontSize:16,color:kopiBrown}}/>
                  <input type="tel" placeholder="WhatsApp number" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} style={{padding:'14px 16px',border:`3px solid ${kopiBrown}`,background:cream,fontFamily:"'Bree Serif',serif",fontSize:16,color:kopiBrown}}/>
                  <select value={form.time} onChange={e=>setForm({...form,time:e.target.value})} style={{padding:'14px 16px',border:`3px solid ${kopiBrown}`,background:cream,fontFamily:"'Bree Serif',serif",fontSize:16,color:kopiBrown,cursor:'pointer'}}>
                    <option value="">Preferred time…</option>
                    <option value="weekday-morning">Weekday mornings</option>
                    <option value="weekday-lunch">Weekday lunch (12–2pm)</option>
                    <option value="weekday-evening">Weekday evenings (after 6pm)</option>
                    <option value="weekend">Weekends</option>
                  </select>
                  <button className="primary-btn" onClick={submitBooking} disabled={!form.name||!form.phone||!form.time} style={{background:form.name&&form.phone&&form.time?accentRed:'#aaa',color:cream,border:`3px solid ${kopiBrown}`,padding:'16px',fontFamily:"'Oswald',sans-serif",fontSize:18,fontWeight:700,letterSpacing:2,cursor:form.name&&form.phone&&form.time?'pointer':'not-allowed',boxShadow:`4px 4px 0 ${kopiBrown}`,transition:'all 0.15s',textTransform:'uppercase',marginTop:6}}>▸ Book My Free Session</button>
                </div>
                <div style={{fontFamily:"'Caveat',cursive",fontSize:16,color:accentRed,textAlign:'center',marginTop:14}}>⚡ only 12 slots left this month ⚡</div>
                <div style={{display:'flex',justifyContent:'center',gap:16,marginTop:14,fontSize:12,fontFamily:"'Oswald',sans-serif",color:kopiMid,letterSpacing:1,flexWrap:'wrap'}}>
                  <span>🔒 100% FREE</span><span>⏱ 20 MINS</span><span>📋 1-PAGE SUMMARY</span>
                </div>
              </div>

              <div style={{marginTop:28,textAlign:'center',padding:'20px',borderTop:`2px dashed ${kopiMid}`}}>
                <div style={{fontFamily:"'Caveat',cursive",fontSize:22,color:kopiBrown,marginBottom:12}}>which archetype are your friends? 👀</div>
                <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap'}}>
                  {['WhatsApp','Instagram','Copy Link'].map(s=>(
                    <button key={s} style={{background:'transparent',border:`2px solid ${kopiBrown}`,padding:'8px 16px',fontFamily:"'Oswald',sans-serif",fontSize:12,letterSpacing:2,color:kopiBrown,cursor:'pointer'}}>{s.toUpperCase()}</button>
                  ))}
                </div>
                <button onClick={restart} style={{marginTop:20,background:'transparent',border:'none',fontFamily:"'Caveat',cursive",fontSize:18,color:kopiMid,cursor:'pointer',textDecoration:'underline'}}>↻ retake the quiz</button>
              </div>
            </div>
          )}

          {/* BOOKED */}
          {stage==='booked' && (
            <div key={animKey} className="fade-up" style={{padding:'40px 0',textAlign:'center'}}>
              <div style={{background:kopitiamGreen,border:`6px solid ${kopiBrown}`,padding:'8px',boxShadow:`8px 8px 0 ${kopiBrown}`,transform:'rotate(-1deg)'}}>
                <div style={{border:`2px dashed ${cream}`,padding:'36px 24px'}}>
                  <div style={{fontSize:64,marginBottom:12}}>☕</div>
                  <div style={{fontFamily:"'Caveat',cursive",fontSize:24,color:accentYellow,letterSpacing:2}}>~ order received ~</div>
                  <h2 style={{fontFamily:"'Rubik Mono One',sans-serif",fontSize:'clamp(26px,6vw,34px)',color:cream,margin:'8px 0 16px',lineHeight:1.1,textShadow:`3px 3px 0 ${kopiBrown}`}}>YOU'RE IN,<br/>{form.name.split(' ')[0]?.toUpperCase()||'FRIEND'}!</h2>
                  <p style={{fontFamily:"'Bree Serif',serif",fontSize:16,color:cream,lineHeight:1.6,margin:0}}>We'll WhatsApp you at <b>{form.phone}</b> within 24 hours to lock in your exact time.<br/><br/>Your consultant will receive your <b>{r&&r.name}</b> result as a pre-brief so the session starts warm.</p>
                </div>
              </div>
              <button onClick={restart} style={{marginTop:28,background:'transparent',border:'none',fontFamily:"'Caveat',cursive",fontSize:18,color:kopiMid,cursor:'pointer',textDecoration:'underline'}}>↻ back to start</button>
            </div>
          )}

          {stage!=='booked'&&<div style={{marginTop:40,textAlign:'center',fontFamily:"'Oswald',sans-serif",fontSize:10,letterSpacing:3,color:kopiMid,paddingBottom:20}}>✦  B & D   M E D I A   A G E N C Y  ✦</div>}
        </div>
      </div>
    </>
  );
}
