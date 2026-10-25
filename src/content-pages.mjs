// Page copy for Launch 1 (Decision 01 + 02). 8 pages x 3 languages.
// Section types are rendered by build.mjs. Plain text only: the renderer escapes it.

import { HOME } from './content-home.mjs';

// Home: page entry built from the approved Home text.
function homePage(lang) {
  const h = HOME[lang];
  return {
    title: h.title, description: h.description, ctaLabel: h.cta, home: h,
    sections: [
      { t: 'hero', h1: h.h1, lede: h.lede },
      { t: 'faq', items: h.faq },
    ],
  };
}

export const PATHS = {
  home:        { en: '/', ar: '/ar/', fr: '/fr/' },
  services:    { en: '/services/', ar: '/ar/services/', fr: '/fr/services/' },
  alterations: { en: '/services/alterations/', ar: '/ar/services/alterations/', fr: '/fr/services/retouches/' },
  repairs:     { en: '/services/repairs/', ar: '/ar/services/repairs/', fr: '/fr/services/reparations/' },
  embroidery:  { en: '/services/embroidery/', ar: '/ar/services/embroidery/', fr: '/fr/services/broderie/' },
  uniforms:    { en: '/services/embroidery/uniforms/', ar: '/ar/services/embroidery/uniforms/', fr: '/fr/services/broderie/uniformes/' },
  about:       { en: '/about/', ar: '/ar/about/', fr: '/fr/a-propos/' },
  visit:       { en: '/visit/', ar: '/ar/visit/', fr: '/fr/nous-trouver/' },
};

// Breadcrumb parent for each page.
export const PARENT = {
  home: null, services: 'home', alterations: 'services', repairs: 'services',
  embroidery: 'services', uniforms: 'embroidery', about: 'home', visit: 'home',
};

// Alt text for the reusable stills.
export const ALT = {
  lockstitch: {
    en: 'An industrial lockstitch sewing machine in the Younes Tailor workshop',
    fr: 'Une machine à coudre industrielle à point noué dans l’atelier Younes Tailor',
    ar: 'ماكينة خياطة صناعية في مشغل خياطة يونس',
  },
  overlock: {
    en: 'An overlock machine with thread cones in the Younes Tailor workshop',
    fr: 'Une surjeteuse et ses cônes de fil dans l’atelier Younes Tailor',
    ar: 'ماكينة أوفرلوك مع بكرات الخيط في مشغل خياطة يونس',
  },
  storefront: {
    en: 'The Younes Tailor shopfront in Blat',
    fr: 'La devanture de Younes Tailor à Blat',
    ar: 'واجهة محل خياطة يونس في بلاط',
  },
  machine: {
    en: 'The multi-needle embroidery machine at Younes Tailor',
    fr: 'La machine à broder multi-aiguilles de Younes Tailor',
    ar: 'ماكينة التطريز متعددة الإبر في خياطة يونس',
  },
};

export const PAGES = {
  // ───────────────────────────────── HOME
  // Text lives in content-home.mjs (verbatim from docs/decisions/home-copy.md).
  home: { cta: 'general', en: homePage('en'), ar: homePage('ar'), fr: homePage('fr') },

  // ───────────────────────────────── SERVICES OVERVIEW
  services: {
    cta: 'general',
    en: {
      title: 'Services — tailoring and embroidery in Byblos | Younes Tailor',
      description: 'Alterations, repairs, embroidery and uniform embroidery at Younes Tailor in Blat, Byblos. Pick the closest service or tell us what you need.',
      ctaLabel: 'Tell us what you need',
      sections: [
        { t: 'pagehead', eyebrow: 'Services', h1: 'Tailoring and embroidery services', lede: 'Two kinds of work in one shop in Blat, Byblos. Pick the closest one, or just tell us what you need.' },
        { t: 'groups', groups: [
          { id: 'tailoring', title: 'Tailoring', intro: 'Clothes you already own, made to fit and last.', cards: [
            { key: 'alterations', text: 'The fit corrected by hand and checked on you.', bullets: ['Hems on trousers, skirts, dresses and sleeves', 'Waists and side seams taken in or let out', 'Suits and blazers tapered', 'Wedding and formal wear fittings'] },
            { key: 'repairs', text: 'Fixed so the garment goes back into use.', bullets: ['Zips, buttons, hooks and snaps', 'Seams and linings', 'Tears, snags and moth holes', 'Older and inherited pieces'] },
          ] },
          { id: 'embroidery', title: 'Embroidery', intro: 'Names, initials, text and logos, stitched in the shop.', trio: true, cards: [
            { key: 'embroidery', text: 'Single pieces welcome. Bring your own item or we supply the blank.', bullets: ['Tees, polos, hoodies and sweaters', 'Caps, stitched in-house', 'Towels, uniforms and bags', 'Designs digitised in-house'] },
            { key: 'uniforms', text: 'For schools, clubs, restaurants and companies.', bullets: ['Quantities and mixed sizes', 'Chest, sleeve, back or cap front', 'Preview before stitching on request', 'No minimum order'] },
          ] },
        ] },
        { t: 'faq', eyebrow: 'Questions', h2: 'Choosing a service', items: [
          ['My job does not fit any of these. Can you still help?', 'Probably. Send a message or a photo on WhatsApp and we will tell you if it is something we can do.'],
          ['Can I combine tailoring and embroidery?', 'Yes. For example, a hem shortened and a name stitched on the same piece. Mention both when you get in touch.'],
          ['Do you supply the garments for embroidery?', 'Yes: tees, hoodies, sweaters, caps, towels and uniforms. You can also bring your own.'],
        ] },
      ],
    },
    fr: {
      title: 'Services — couture et broderie à Byblos | Younes Tailor',
      description: 'Retouches, réparations, broderie et broderie d’uniformes chez Younes Tailor à Blat, Byblos. Choisissez le service ou dites-nous ce qu’il vous faut.',
      ctaLabel: 'Dites-nous ce qu’il vous faut',
      sections: [
        { t: 'pagehead', eyebrow: 'Services', h1: 'Couture et broderie', lede: 'Deux métiers dans un seul atelier à Blat, Byblos. Choisissez le plus proche de votre besoin, ou dites-nous simplement ce qu’il vous faut.' },
        { t: 'groups', groups: [
          { id: 'tailoring', title: 'Couture', intro: 'Vos vêtements, ajustés et faits pour durer.', cards: [
            { key: 'alterations', text: 'La coupe corrigée à la main et vérifiée sur vous.', bullets: ['Ourlets de pantalons, jupes, robes et manches', 'Tailles et coutures latérales reprises ou élargies', 'Costumes et vestes ajustés', 'Essayages de mariage et de cérémonie'] },
            { key: 'repairs', text: 'Réparé pour que le vêtement reprenne du service.', bullets: ['Fermetures, boutons, agrafes et pressions', 'Coutures et doublures', 'Accrocs, fils tirés et trous de mites', 'Pièces anciennes et héritées'] },
          ] },
          { id: 'embroidery', title: 'Broderie', intro: 'Noms, initiales, textes et logos, brodés à l’atelier.', trio: true, cards: [
            { key: 'embroidery', text: 'À partir d’une pièce. Apportez votre article ou choisissez un article fourni par l’atelier.', bullets: ['T-shirts, polos, sweats et pulls', 'Casquettes, brodées sur place', 'Serviettes, uniformes et sacs', 'Motifs numérisés sur place'] },
            { key: 'uniforms', text: 'Pour écoles, clubs, restaurants et entreprises.', bullets: ['Quantités et tailles mélangées', 'Poitrine, manche, dos ou devant de casquette', 'Aperçu avant broderie sur demande', 'Pas de minimum de commande'] },
          ] },
        ] },
        { t: 'faq', eyebrow: 'Questions', h2: 'Choisir un service', items: [
          ['Mon besoin ne rentre dans aucune case. Pouvez-vous aider ?', 'Sans doute. Envoyez un message ou une photo sur WhatsApp et on vous dit si c’est faisable.'],
          ['Peut-on combiner couture et broderie ?', 'Oui. Par exemple, un ourlet raccourci et un prénom brodé sur la même pièce. Précisez les deux en nous écrivant.'],
          ['Fournissez-vous les vêtements à broder ?', 'Oui : t-shirts, sweats, pulls, casquettes, serviettes et uniformes. Vous pouvez aussi apporter les vôtres.'],
        ] },
      ],
    },
    ar: {
      title: 'الخدمات — خياطة وتطريز في جبيل | خياطة يونس',
      description: 'تعديل، تصليح، تطريز وتطريز الزيّ الموحّد في خياطة يونس، بلاط، جبيل. اختاروا الخدمة الأقرب أو أخبرونا بما تحتاجونه.',
      ctaLabel: 'أخبرونا بما تحتاجونه',
      sections: [
        { t: 'pagehead', eyebrow: 'الخدمات', h1: 'خدمات الخياطة والتطريز', lede: 'نوعان من العمل في محل واحد في بلاط، جبيل. اختاروا الأقرب إلى حاجتكم، أو أخبرونا بها مباشرة.' },
        { t: 'groups', groups: [
          { id: 'tailoring', title: 'الخياطة', intro: 'ملابسكم نفسها، على قياسكم وتدوم أكثر.', cards: [
            { key: 'alterations', text: 'ضبط القَصّة باليد والتأكّد منها عليكم.', bullets: ['تقصير البنطلونات والتنانير والفساتين والأكمام', 'تضييق أو توسيع الخصر والجوانب', 'ضبط البدلات والسترات', 'قياسات أثواب الأعراس والسهرات'] },
            { key: 'repairs', text: 'تصليح يعيد القطعة إلى الاستعمال.', bullets: ['سحّابات، أزرار، كبّاسات ومشابك', 'خياطات وبطانات', 'شقوق وخيوط مسحوبة وثقوب العثّ', 'القطع القديمة والموروثة'] },
          ] },
          { id: 'embroidery', title: 'التطريز', intro: 'أسماء وأحرف أولى ونصوص وشعارات، نطرّزها في المحل.', trio: true, cards: [
            { key: 'embroidery', text: 'القطعة الواحدة مرحّب بها. أحضروا قطعتكم أو نؤمّنها لكم.', bullets: ['تي شيرت، بولو، هودي وكنزات', 'قبّعات، نطرّزها في المحل', 'مناشف، زيّ موحّد وحقائب', 'تحويل التصاميم رقمياً في المحل'] },
            { key: 'uniforms', text: 'للمدارس والنوادي والمطاعم والشركات.', bullets: ['كمّيات ومقاسات مختلفة', 'الصدر، الكمّ، الظهر أو مقدّمة القبّعة', 'معاينة قبل التطريز عند الطلب', 'لا حدّ أدنى للطلب'] },
          ] },
        ] },
        { t: 'faq', eyebrow: 'أسئلة', h2: 'اختيار الخدمة', items: [
          ['طلبي لا يشبه أيّاً من هذه الخدمات. هل يمكنكم المساعدة؟', 'على الأرجح. أرسلوا رسالة أو صورة على واتساب ونقول لكم إن كان بإمكاننا تنفيذه.'],
          ['هل يمكن الجمع بين الخياطة والتطريز؟', 'نعم. مثلاً، تقصير قطعة وتطريز اسم عليها في الوقت نفسه. اذكروا الأمرين حين تتواصلون معنا.'],
          ['هل تؤمّنون القطع للتطريز؟', 'نعم: تي شيرت، هودي، كنزات، قبّعات، مناشف وزيّ موحّد. ويمكنكم أيضاً إحضار قطعكم.'],
        ] },
      ],
    },
  },

  // ───────────────────────────────── ALTERATIONS
  alterations: {
    cta: 'alterations',
    en: {
      title: 'Alterations & fitting in Blat, Byblos | Younes Tailor',
      description: 'Hems, take-ins, suit tapering and wedding fittings in Blat, Byblos. Done by hand and checked on you, for men and women. Request a fitting on WhatsApp.',
      ctaLabel: 'Request a fitting',
      sections: [
        { t: 'pagehead', eyebrow: 'Tailoring', h1: 'Alterations & fitting', lede: 'Hems, take-ins and tapering, done by hand and checked on you. Everyday clothes, workwear and wedding outfits, for men and women.', image: 'lockstitch' },
        { t: 'list', eyebrow: 'What we do', h2: 'What alterations cover', intro: 'Most jobs fall into a few kinds of work, and most are simpler than people expect.', items: [
          'Hems on trousers, skirts, dresses and sleeves, shortened or lengthened',
          'Waists and side seams taken in or let out',
          'Suits and blazers tapered: sleeves, waist, trouser break',
          'Dress straps shortened and bodices adjusted',
          'Cuffs redone on sleeves and trouser legs',
          'Zips, buttons and snaps replaced as part of a fitting',
        ], note: 'Bought online or abroad? The label does not matter, the fit does.' },
        { t: 'process', which: 'tailoring', override: { 1: ['Fit', 'We pin it on you and agree the price. Bigger jobs and wedding outfits may need a second check fitting, and we say so upfront.'] } },
        { t: 'timeline', id: 'wedding', eyebrow: 'Wedding & formal wear', h2: 'Wedding and formal wear',
          intro: 'A wedding fitting gets more time per visit and a schedule worked back from the date. The bride, the groom and the wedding party can be fitted on one timeline. Borrowed, inherited and second-hand gowns are fine: we check the fabric and seams before anything is cut.',
          stepsTitle: 'When to come in',
          steps: [
            ['6–8 weeks before', 'First fitting', 'Bring the gown or suit in. Bodies change in the weeks before a wedding, so this fitting sets a baseline.'],
            ['3–4 weeks before', 'Working fitting', 'Most of the work happens here: hem, take-in, straps and bodice on a gown; shoulders, waist and trouser break on a suit. Pinned on you, with your shoes on.'],
            ['1–2 weeks before', 'Final check', 'A short fitting to confirm the work, then a final press.'],
          ],
          after: 'Less than two weeks to go? Call or message us and we will tell you what is realistic.',
          aside: { h: 'What to bring', items: [
            'The shoes you will wear. Heel height changes a hem by centimetres.',
            'Any shapewear or undergarments you will wear under a gown.',
            'For a suit: the belt or braces you will wear, and the cufflinks if they change the sleeve length.',
          ] } },
        { t: 'compare', eyebrow: 'Worth altering?', h2: 'Alter it or replace it',
          good: { h: 'Usually worth it', items: [
            'The shoulders fit and the rest does not. Shoulders are the hard part of a jacket to change.',
            'It fitted before and does not now. This is the most common job we do.',
            'Only the length is wrong. The quickest, simplest kind of alteration.',
            'The cloth is good. A well-made wool suit or heavy coat is usually worth refitting.',
          ] },
          bad: { h: 'Usually not worth it', items: [
            'More than two sizes out in the chest. A tailor can move a hem, not rebuild the frame of a jacket.',
            'The fabric is already wearing through, with nothing solid left to sew into.',
          ] },
          after: 'Not sure? Send a photo on WhatsApp and we will tell you before you make the trip.' },
        { t: 'faq', eyebrow: 'Questions', h2: 'About alterations', items: [
          ['How much does an alteration cost?', 'It depends on the garment and the fabric. You get the price before we start, so there are no surprises at collection. Send a photo on WhatsApp for an estimate.'],
          ['How long does it take?', 'Most alterations are ready in 2–3 days. We confirm the date when you drop the garment off.'],
          ['Can you take in or let out a suit jacket?', 'Yes, within the seam allowance in the garment. We tell you how much room there is before we cut anything.'],
          ['How many fittings will I need?', 'Most jobs need one fitting and one collection visit. More involved tapering or a wedding outfit may need a second check fitting.'],
          ['Do you alter women’s and men’s clothes?', 'Yes, everyday clothes, workwear and occasion pieces for the whole family.'],
        ] },
      ],
    },
    fr: {
      title: 'Retouches et ajustements à Blat, Byblos | Younes Tailor',
      description: 'Ourlets, reprises, ajustement de costumes et essayages de mariage à Blat, Byblos. À la main et vérifié sur vous, hommes et femmes. Demandez un essayage sur WhatsApp.',
      ctaLabel: 'Demander un essayage',
      sections: [
        { t: 'pagehead', eyebrow: 'Couture', h1: 'Retouches & ajustements', lede: 'Ourlets, reprises et ajustements, faits à la main et vérifiés sur vous. Vêtements du quotidien, tenues de travail et de mariage, pour hommes et femmes.', image: 'lockstitch' },
        { t: 'list', eyebrow: 'Nos retouches', h2: 'Ce que couvrent les retouches', intro: 'La plupart des travaux entrent dans quelques catégories, souvent plus simples qu’on ne le pense.', items: [
          'Ourlets de pantalons, jupes, robes et manches, raccourcis ou rallongés',
          'Tailles et coutures latérales reprises ou élargies',
          'Costumes et vestes ajustés : manches, taille, tombé du pantalon',
          'Bretelles de robe raccourcies et bustiers ajustés',
          'Revers refaits aux manches et aux bas de pantalon',
          'Fermetures, boutons et pressions remplacés lors d’un essayage',
        ], note: 'Acheté en ligne ou à l’étranger ? La marque ne compte pas, la coupe oui.' },
        { t: 'process', which: 'tailoring', override: { 1: ['Essayage', 'On épingle sur vous et on fixe le prix. Les gros travaux et les tenues de mariage peuvent demander un second essayage de contrôle, et on vous le dit dès le départ.'] } },
        { t: 'timeline', id: 'wedding', eyebrow: 'Mariage & cérémonie', h2: 'Mariage et cérémonie',
          intro: 'Un essayage de mariage, c’est plus de temps par visite et un calendrier établi à rebours depuis la date. La mariée, le marié et le cortège peuvent suivre un seul calendrier. Robe empruntée, héritée ou d’occasion : on vérifie le tissu et les coutures avant de couper quoi que ce soit.',
          stepsTitle: 'Quand venir',
          steps: [
            ['6 à 8 semaines avant', 'Premier essayage', 'Apportez la robe ou le costume. Le corps change dans les semaines qui précèdent un mariage : cet essayage sert de point de départ.'],
            ['3 à 4 semaines avant', 'Essayage principal', 'C’est là que se fait l’essentiel : ourlet, reprise, bretelles et bustier pour une robe ; épaules, taille et tombé du pantalon pour un costume. Épinglé sur vous, chaussures aux pieds.'],
            ['1 à 2 semaines avant', 'Contrôle final', 'Un court essayage pour confirmer le travail, puis un dernier repassage.'],
          ],
          after: 'Moins de deux semaines avant la date ? Appelez-nous ou écrivez-nous, on vous dira ce qui est réaliste.',
          aside: { h: 'À apporter', items: [
            'Les chaussures que vous porterez. La hauteur du talon change un ourlet de plusieurs centimètres.',
            'La gaine ou les sous-vêtements que vous porterez sous la robe.',
            'Pour un costume : la ceinture ou les bretelles prévues, et les boutons de manchette s’ils changent la longueur des manches.',
          ] } },
        { t: 'compare', eyebrow: 'Retoucher ou pas ?', h2: 'Retoucher ou remplacer',
          good: { h: 'En général, ça vaut la peine', items: [
            'Les épaules tombent bien, le reste non. Les épaules sont la partie difficile à modifier sur une veste.',
            'Il vous allait avant et plus maintenant. C’est le travail le plus courant à l’atelier.',
            'Seule la longueur ne va pas. La retouche la plus simple et la plus rapide.',
            'Le tissu est bon. Un costume en laine bien fait ou un manteau épais mérite presque toujours d’être réajusté.',
          ] },
          bad: { h: 'En général, ça ne vaut pas la peine', items: [
            'Plus de deux tailles d’écart à la poitrine. On peut déplacer un ourlet, pas reconstruire la structure d’une veste.',
            'Le tissu est déjà usé, sans plus rien de solide sur quoi coudre.',
          ] },
          after: 'Vous hésitez ? Envoyez une photo sur WhatsApp et on vous répond avant que vous vous déplaciez.' },
        { t: 'faq', eyebrow: 'Questions', h2: 'À propos des retouches', items: [
          ['Combien coûte une retouche ?', 'Cela dépend du vêtement et du tissu. Le prix est fixé avant de commencer, sans surprise au retrait. Envoyez une photo sur WhatsApp pour une estimation.'],
          ['Combien de temps faut-il ?', 'La plupart des retouches sont prêtes en 2 à 3 jours. On confirme la date au moment du dépôt.'],
          ['Pouvez-vous reprendre ou élargir une veste de costume ?', 'Oui, dans la limite de la réserve de couture du vêtement. On vous dit la marge disponible avant de couper.'],
          ['Combien d’essayages faut-il ?', 'La plupart des travaux demandent un essayage et un passage pour le retrait. Un ajustement plus poussé ou une tenue de mariage peut demander un second essayage de contrôle.'],
          ['Retouchez-vous les vêtements pour femmes et pour hommes ?', 'Oui : vêtements du quotidien, tenues de travail et de cérémonie, pour toute la famille.'],
        ] },
      ],
    },
    ar: {
      title: 'تعديل وضبط القياس في بلاط، جبيل | خياطة يونس',
      description: 'تقصير، تضييق، ضبط البدلات وقياسات الأعراس في بلاط، جبيل. شغل يد نتأكّد منه عليكم، للرجال والنساء. اطلبوا موعد قياس على واتساب.',
      ctaLabel: 'اطلبوا موعد قياس',
      sections: [
        { t: 'pagehead', eyebrow: 'الخياطة', h1: 'تعديل وضبط القياس', lede: 'تقصير وتضييق وضبط القَصّة، بشغل يد ونتأكّد منها عليكم. ملابس يومية، ملابس عمل وأثواب أعراس، للرجال والنساء.', image: 'lockstitch' },
        { t: 'list', eyebrow: 'ما نعمله', h2: 'ماذا يشمل التعديل', intro: 'أغلب الأعمال تندرج تحت أنواع قليلة، وأغلبها أبسط ممّا يُتوقَّع.', items: [
          'تقصير أو تطويل البنطلونات والتنانير والفساتين والأكمام',
          'تضييق أو توسيع الخصر والجوانب',
          'ضبط البدلات والسترات: الأكمام، الخصر، وسقوط البنطلون',
          'تقصير حمّالات الفساتين وضبط الصدر',
          'إعادة ثنية الأكمام وأطراف البنطلون',
          'تبديل السحّابات والأزرار والكبّاسات ضمن القياس',
        ], note: 'اشتريتموها أونلاين أو من الخارج؟ الماركة لا تهمّ، المهمّ القياس.' },
        { t: 'process', which: 'tailoring', override: { 1: ['القياس', 'نثبّت القطعة عليكم ونتّفق على السعر. الأعمال الأكبر وأثواب الأعراس قد تحتاج قياساً ثانياً للتأكّد، ونخبركم بذلك من البداية.'] } },
        { t: 'timeline', id: 'wedding', eyebrow: 'الأعراس والسهرات', h2: 'أثواب الأعراس والسهرات',
          intro: 'قياس العرس يأخذ وقتاً أطول في كلّ زيارة، وجدولاً يُحسب رجوعاً من تاريخ العرس. يمكن أن يتبع العروس والعريس والمرافقون جدولاً واحداً. فستان مستعار أو موروث أو مستعمل؟ لا مشكلة: نفحص القماش والخياطات قبل أيّ قصّ.',
          stepsTitle: 'متى تأتون',
          steps: [
            ['قبل 6–8 أسابيع', 'القياس الأول', 'أحضروا الفستان أو البدلة. الجسم يتغيّر في الأسابيع التي تسبق العرس، لذا يحدّد هذا القياس نقطة البداية.'],
            ['قبل 3–4 أسابيع', 'قياس العمل', 'هنا يُنجز معظم العمل: التقصير والتضييق والحمّالات والصدر للفستان؛ الأكتاف والخصر وسقوط البنطلون للبدلة. نثبّت كلّ شيء عليكم، والحذاء في أقدامكم.'],
            ['قبل 1–2 أسبوع', 'التأكيد الأخير', 'قياس قصير للتأكّد من العمل، ثمّ كيّ أخير.'],
          ],
          after: 'بقي أقلّ من أسبوعين؟ اتصلوا بنا أو راسلونا ونقول لكم ما هو ممكن.',
          aside: { h: 'ماذا تحضرون', items: [
            'الحذاء الذي ستلبسونه. ارتفاع الكعب يغيّر طول الفستان بالسنتيمترات.',
            'المشدّ أو الملابس الداخلية التي ستلبسونها تحت الفستان.',
            'للبدلة: الحزام أو الحمّالات، وأزرار الأكمام إن كانت تغيّر طول الكمّ.',
          ] } },
        { t: 'compare', eyebrow: 'هل يستحقّ التعديل؟', h2: 'تعديل أم استبدال',
          good: { h: 'غالباً يستحقّ', items: [
            'الأكتاف مضبوطة والباقي لا. الأكتاف هي الجزء الصعب تغييره في السترة.',
            'كانت على قياسكم ولم تعد كذلك. هذا أكثر عمل نقوم به.',
            'الطول وحده غير مناسب. أسرع وأبسط نوع من التعديل.',
            'القماش جيّد. بدلة صوف متقنة أو معطف ثقيل يستحقّ إعادة الضبط غالباً.',
          ] },
          bad: { h: 'غالباً لا يستحقّ', items: [
            'فرق أكثر من مقاسين في الصدر. يمكن نقل التقصير، لا إعادة بناء هيكل السترة.',
            'القماش بدأ يهترئ، ولم يبقَ ما يمكن الخياطة عليه.',
          ] },
          after: 'لستم متأكّدين؟ أرسلوا صورة على واتساب ونجيبكم قبل أن تأتوا.' },
        { t: 'faq', eyebrow: 'أسئلة', h2: 'عن التعديل', items: [
          ['كم يكلّف التعديل؟', 'يتوقّف على القطعة والقماش. نعطيكم السعر قبل أن نبدأ، فلا مفاجآت عند الاستلام. أرسلوا صورة على واتساب لتقدير أوّلي.'],
          ['كم يستغرق؟', 'أغلب التعديلات تجهز خلال 2–3 أيام. نؤكّد الموعد عند التسليم.'],
          ['هل يمكن تضييق أو توسيع سترة البدلة؟', 'نعم، ضمن هامش الخياطة الموجود في القطعة. نخبركم بالمساحة المتاحة قبل أيّ قصّ.'],
          ['كم قياساً سأحتاج؟', 'أغلب الأعمال تحتاج قياساً واحداً وزيارة للاستلام. الضبط الأدقّ أو ثوب العرس قد يحتاج قياساً ثانياً للتأكّد.'],
          ['هل تعدّلون ملابس النساء والرجال؟', 'نعم، ملابس يومية وملابس عمل وقطع مناسبات لكلّ العائلة.'],
        ] },
      ],
    },
  },

  // ───────────────────────────────── REPAIRS
  repairs: {
    cta: 'repairs',
    en: {
      title: 'Repairs & mending in Blat, Byblos | Younes Tailor',
      description: 'Zips, seams, linings, tears and moth holes repaired in Blat, Byblos, plus careful restoration of older and inherited pieces. Request a repair on WhatsApp.',
      ctaLabel: 'Request a repair',
      sections: [
        { t: 'pagehead', eyebrow: 'Tailoring', h1: 'Repairs & mending', lede: 'Zips, seams, linings and tears fixed so the garment goes back into use. Older and inherited pieces get a careful look first.', image: 'overlock' },
        { t: 'list', eyebrow: 'What we do', h2: 'Repaired, not replaced', intro: 'A lot of worn-out clothes are one broken part away from years more wear.', items: [
          'Zips replaced on trousers, jackets, skirts and bags',
          'Seams repaired and reinforced at stress points',
          'Linings replaced in coats, blazers and jackets',
          'Small tears, snags and moth holes mended',
          'Buttons, hooks, snaps and clasps replaced',
          'Patches on denim and workwear',
        ] },
        { t: 'process', which: 'tailoring', override: {
          0: ['Drop off', 'Bring it in during opening hours, or send a photo on WhatsApp first.'],
          1: ['Fit, if needed', 'Most repairs need no fitting. If the repair changes how the garment sits, we check it on you. The price is agreed first.'],
        } },
        { t: 'restoration', id: 'restoration', eyebrow: 'Restoration', h2: 'Older and inherited pieces',
          intro: 'Restoring an older piece is about keeping what makes it worth keeping: the cloth, the construction, the history. We look at it first and tell you what is realistic before any cost is discussed.',
          items: [
            'Heirloom and vintage garments: fabric stabilised and repaired',
            'Linings and structural repairs on older coats and suits',
            'Moth holes and small tears mended',
            'Buttons, lace and trim repaired, or matched as closely as we can, colour included',
            'Inherited and borrowed wedding dresses',
          ],
          note: 'We can stabilise a piece and keep its age, or bring it closer to new. Tell us which you prefer.',
          aside: { h: 'Before you bring it in', items: [
            'Skip the plastic bag. Wrap it loosely in a clean cotton sheet or pillowcase.',
            'Do not treat stains yourself. Tell us what the stain is and roughly how old.',
            'Carry it flat or on a hanger, not folded along an old crease.',
          ] } },
        { t: 'faq', eyebrow: 'Questions', h2: 'About repairs', items: [
          ['My zip is stuck, not broken. Does it need replacing?', 'Often not. A stuck zip can be an alignment problem rather than a worn-out zip. We check which it is before charging for a new one.'],
          ['Can you mend a tear so it does not show?', 'On most woven fabrics, yes. Knits and some prints are harder to hide completely; we tell you what to expect for your fabric.'],
          ['Is an old winter coat worth repairing?', 'Usually, if the fabric is still sound. A relined coat in a heavier cloth often outlasts a cheap new one.'],
          ['How do I know if a piece can be restored?', 'Bring it in or send a photo. We look at the fabric and construction and tell you the options before any work starts.'],
          ['How long does a repair take?', 'It depends on the job. We confirm a collection date when you bring it in.'],
        ] },
      ],
    },
    fr: {
      title: 'Réparations de vêtements à Blat, Byblos | Younes Tailor',
      description: 'Fermetures, coutures, doublures, accrocs et trous de mites réparés à Blat, Byblos, et restauration soignée des pièces anciennes ou héritées. Demande sur WhatsApp.',
      ctaLabel: 'Demander une réparation',
      sections: [
        { t: 'pagehead', eyebrow: 'Couture', h1: 'Réparations', lede: 'Fermetures, coutures, doublures et accrocs réparés pour que le vêtement reprenne du service. Les pièces anciennes ou héritées sont d’abord examinées avec soin.', image: 'overlock' },
        { t: 'list', eyebrow: 'Nos réparations', h2: 'Réparé, pas remplacé', intro: 'Beaucoup de vêtements qu’on croit usés n’ont besoin que d’une petite réparation pour durer encore des années.', items: [
          'Fermetures remplacées sur pantalons, vestes, jupes et sacs',
          'Coutures réparées et renforcées aux points de tension',
          'Doublures remplacées dans les manteaux, blazers et vestes',
          'Petits accrocs, fils tirés et trous de mites reprisés',
          'Boutons, agrafes, pressions et fermoirs remplacés',
          'Pièces sur le denim et les vêtements de travail',
        ] },
        { t: 'process', which: 'tailoring', override: {
          0: ['Dépôt', 'Apportez-le pendant les heures d’ouverture, ou envoyez d’abord une photo sur WhatsApp.'],
          1: ['Essayage, si besoin', 'La plupart des réparations ne demandent pas d’essayage. Si la réparation change le tombé du vêtement, on vérifie sur vous. Le prix est fixé d’abord.'],
        } },
        { t: 'restoration', id: 'restoration', eyebrow: 'Restauration', h2: 'Pièces anciennes et héritées',
          intro: 'Restaurer une pièce ancienne, c’est garder ce qui la rend précieuse : le tissu, la construction, l’histoire. On l’examine d’abord et on vous dit ce qui est réaliste avant de parler de prix.',
          items: [
            'Vêtements de famille et vintage : tissu stabilisé et réparé',
            'Doublures et réparations de structure sur les manteaux et costumes anciens',
            'Trous de mites et petits accrocs reprisés',
            'Boutons, dentelles et galons réparés, ou assortis au plus près, couleur comprise',
            'Robes de mariée héritées ou empruntées',
          ],
          note: 'On peut stabiliser une pièce en gardant sa patine, ou la rapprocher du neuf. Dites-nous ce que vous préférez.',
          aside: { h: 'Avant de l’apporter', items: [
            'Évitez le sac plastique. Enveloppez-la sans serrer dans un drap ou une taie en coton propre.',
            'Ne traitez pas les taches vous-même. Dites-nous de quelle tache il s’agit et son âge approximatif.',
            'Portez-la à plat ou sur un cintre, sans la replier sur un vieux pli.',
          ] } },
        { t: 'faq', eyebrow: 'Questions', h2: 'À propos des réparations', items: [
          ['Ma fermeture est bloquée, pas cassée. Faut-il la changer ?', 'Souvent non. Une fermeture bloquée peut être un problème d’alignement plutôt qu’une fermeture usée. On vérifie avant de facturer une neuve.'],
          ['Pouvez-vous réparer un accroc sans qu’il se voie ?', 'Sur la plupart des tissus tissés, oui. Les mailles et certains imprimés sont plus difficiles à rendre invisibles ; on vous dit à quoi vous attendre pour votre tissu.'],
          ['Un vieux manteau d’hiver vaut-il la réparation ?', 'En général oui, si le tissu est encore sain. Un manteau redoublé dans un drap plus épais dure souvent plus qu’un neuf bon marché.'],
          ['Comment savoir si une pièce peut être restaurée ?', 'Apportez-la ou envoyez une photo. On examine le tissu et la construction et on vous présente les options avant tout travail.'],
          ['Combien de temps prend une réparation ?', 'Cela dépend du travail. On confirme une date de retrait au moment du dépôt.'],
        ] },
      ],
    },
    ar: {
      title: 'تصليح وترقيع الملابس في بلاط، جبيل | خياطة يونس',
      description: 'تصليح السحّابات والخياطات والبطانات والشقوق وثقوب العثّ في بلاط، جبيل، وترميم دقيق للقطع القديمة والموروثة. اطلبوا التصليح على واتساب.',
      ctaLabel: 'اطلبوا تصليحاً',
      sections: [
        { t: 'pagehead', eyebrow: 'الخياطة', h1: 'تصليح وترقيع الملابس', lede: 'سحّابات وخياطات وبطانات وشقوق نصلّحها لتعود القطعة إلى الاستعمال. والقطع القديمة والموروثة نفحصها بعناية أولاً.', image: 'overlock' },
        { t: 'list', eyebrow: 'ما نعمله', h2: 'نصلّح ولا نرمي', intro: 'كثير من الملابس «المنتهية» ينقصها تصليح قطعة واحدة لتُلبس سنوات أخرى.', items: [
          'تبديل السحّابات في البنطلونات والسترات والتنانير والحقائب',
          'تصليح الخياطات وتقويتها عند نقاط الشدّ',
          'تبديل البطانات في المعاطف والسترات',
          'ترقيع الشقوق الصغيرة والخيوط المسحوبة وثقوب العثّ',
          'تبديل الأزرار والكبّاسات والمشابك',
          'رقع على الجينز وملابس العمل',
        ] },
        { t: 'process', which: 'tailoring', override: {
          0: ['التسليم', 'أحضروا القطعة خلال ساعات العمل، أو أرسلوا صورة على واتساب أولاً.'],
          1: ['القياس، إن لزم', 'أغلب التصليحات لا تحتاج إلى قياس. إن كان التصليح يغيّر سقوط القطعة، نتأكّد منه عليكم. ونتّفق على السعر أولاً.'],
        } },
        { t: 'restoration', id: 'restoration', eyebrow: 'الترميم', h2: 'القطع القديمة والموروثة',
          intro: 'ترميم قطعة قديمة يعني الحفاظ على ما يجعلها تستحقّ: القماش، طريقة الصنع، والذكرى. نفحصها أولاً ونقول لكم ما هو ممكن قبل الحديث عن أيّ كلفة.',
          items: [
            'قطع موروثة وقديمة: تثبيت القماش وتصليحه',
            'بطانات وتصليحات في هيكل المعاطف والبدلات القديمة',
            'ترقيع ثقوب العثّ والشقوق الصغيرة',
            'تصليح الأزرار والدانتيل والزينة، أو مطابقتها قدر الإمكان، مع اللون',
            'فساتين أعراس موروثة أو مستعارة',
          ],
          note: 'يمكننا تثبيت القطعة مع الحفاظ على قِدمها، أو تقريبها من الجديد. أخبرونا بما تفضّلون.',
          aside: { h: 'قبل أن تحضروها', items: [
            'لا تضعوها في كيس نايلون. لفّوها بخفّة في شرشف أو كيس مخدّة قطني نظيف.',
            'لا تعالجوا البقع بأنفسكم. أخبرونا ما هي البقعة وكم عمرها تقريباً.',
            'احملوها مسطّحة أو على علّاقة، لا مطويّة على ثنية قديمة.',
          ] } },
        { t: 'faq', eyebrow: 'أسئلة', h2: 'عن التصليح', items: [
          ['السحّاب عالق لا مكسور. هل يجب تبديله؟', 'غالباً لا. قد تكون المشكلة في الاستقامة لا في السحّاب نفسه. نتأكّد قبل أن نحاسب على سحّاب جديد.'],
          ['هل يمكن ترقيع الشقّ بحيث لا يظهر؟', 'في أغلب الأقمشة المنسوجة، نعم. التريكو وبعض الأقمشة المطبّعة أصعب؛ نقول لكم ما تتوقّعونه بحسب قماشكم.'],
          ['هل يستحقّ المعطف الشتوي القديم التصليح؟', 'غالباً نعم، إن كان القماش ما زال سليماً. معطف ببطانة جديدة وقماش ثقيل يدوم أكثر من معطف جديد رخيص.'],
          ['كيف أعرف إن كانت القطعة قابلة للترميم؟', 'أحضروها أو أرسلوا صورة. نفحص القماش وطريقة الصنع ونعرض عليكم الخيارات قبل أيّ عمل.'],
          ['كم يستغرق التصليح؟', 'بحسب العمل. نؤكّد موعد الاستلام عند التسليم.'],
        ] },
      ],
    },
  },

  // ───────────────────────────────── EMBROIDERY
  embroidery: {
    cta: 'embroidery',
    en: {
      title: 'Embroidery in Blat, Byblos — names, logos, caps | Younes Tailor',
      description: 'Names, initials, text and logos embroidered in Blat, Byblos. Blanks supplied or bring your own. No minimum order, one price, preview before stitching on request.',
      ctaLabel: 'Request a quote',
      sections: [
        { t: 'pagehead', eyebrow: 'Embroidery', h1: 'Embroidery', lede: 'Names, initials, text and logos stitched in the shop. Bring your own item or we supply the blank. Single pieces welcome.', video: 2, trio: true },
        { t: 'chips', eyebrow: 'What we stitch on', h2: 'What we stitch on', items: [
          ['t-shirt', 'Tees'], ['t-shirt', 'Polos'], ['coat-hanger', 'Hoodies'], ['coat-hanger', 'Sweaters'], ['baseball-cap', 'Caps'], ['check', 'Towels'], ['users-three', 'Uniforms'], ['check', 'Bags'],
        ], note: 'Caps are stitched in-house, on our own machine.' },
        { t: 'twocol', cols: [
          { eyebrow: 'Your item or ours', h2: 'Blanks supplied, or bring your own', p: 'We can supply tees, hoodies, sweaters, caps, towels and uniforms. Or bring the piece you already have and we stitch on that.' },
          { eyebrow: 'What we stitch', h2: 'Names, text, logos, your artwork', p: 'Names, initials, short text, logos and your own artwork. Every design is digitised in-house, so a logo file or a photo of handwriting becomes a stitch file here.' },
        ] },
        { t: 'process', which: 'embroidery', trio: true },
        { t: 'videos', eyebrow: 'In the shop', h2: 'The machine at work', clips: [3, 4] },
        { t: 'faq', eyebrow: 'Questions', h2: 'About embroidery', items: [
          ['Is there a minimum order?', 'No. One piece is fine.'],
          ['Do you charge separately for the design or digitising?', 'No. You get one all-in price, with no separate design or digitising charge.'],
          ['Can I see the design before you stitch?', 'Yes. Ask for a preview and we show it to you before stitching.'],
          ['What should I send as artwork?', 'A logo file if you have one. A clear photo of a drawing or handwriting works too. Send it in the WhatsApp chat after the form opens it. If you need help with the artwork, tick the box and we will work on it with you.'],
          ['Can you stitch on caps?', 'Yes. Caps are stitched in-house.'],
        ] },
      ],
    },
    fr: {
      title: 'Broderie à Blat, Byblos — noms, logos, casquettes | Younes Tailor',
      description: 'Noms, initiales, textes et logos brodés à Blat, Byblos. Article fourni par l’atelier ou apporté par vous. Pas de minimum, un seul prix, aperçu avant broderie sur demande.',
      ctaLabel: 'Demander un devis',
      sections: [
        { t: 'pagehead', eyebrow: 'Broderie', h1: 'Broderie', lede: 'Noms, initiales, textes et logos brodés à l’atelier. Apportez votre article ou choisissez un article fourni par l’atelier. À partir d’une pièce.', video: 2, trio: true },
        { t: 'chips', eyebrow: 'Supports', h2: 'Sur quoi on brode', items: [
          ['t-shirt', 'T-shirts'], ['t-shirt', 'Polos'], ['coat-hanger', 'Sweats à capuche'], ['coat-hanger', 'Pulls'], ['baseball-cap', 'Casquettes'], ['check', 'Serviettes'], ['users-three', 'Uniformes'], ['check', 'Sacs'],
        ], note: 'Les casquettes sont brodées sur place, sur notre propre machine.' },
        { t: 'twocol', cols: [
          { eyebrow: 'Votre article ou le nôtre', h2: 'Un article de l’atelier, ou le vôtre', p: 'L’atelier peut fournir t-shirts, sweats, pulls, casquettes, serviettes et uniformes. Ou apportez la pièce que vous avez déjà et on brode dessus.' },
          { eyebrow: 'Ce qu’on brode', h2: 'Noms, textes, logos, votre visuel', p: 'Noms, initiales, textes courts, logos et vos propres visuels. Chaque motif est numérisé sur place : un fichier de logo ou la photo d’une écriture devient un fichier de broderie ici.' },
        ] },
        { t: 'process', which: 'embroidery', trio: true },
        { t: 'videos', eyebrow: 'À l’atelier', h2: 'La machine en marche', clips: [3, 4] },
        { t: 'faq', eyebrow: 'Questions', h2: 'À propos de la broderie', items: [
          ['Y a-t-il un minimum de commande ?', 'Non. Une seule pièce suffit.'],
          ['Facturez-vous la création ou la numérisation à part ?', 'Non. Vous avez un seul prix, tout compris, sans frais de création ou de numérisation.'],
          ['Puis-je voir le motif avant la broderie ?', 'Oui. Demandez un aperçu et on vous le montre avant de broder.'],
          ['Quel visuel faut-il envoyer ?', 'Un fichier de logo si vous en avez un. La photo nette d’un dessin ou d’une écriture convient aussi. Envoyez-la dans WhatsApp, une fois la conversation ouverte par le formulaire. Besoin d’aide pour le visuel ? Cochez la case et on le prépare avec vous.'],
          ['Brodez-vous les casquettes ?', 'Oui. Les casquettes sont brodées sur place.'],
        ] },
      ],
    },
    ar: {
      title: 'تطريز في بلاط، جبيل — أسماء وشعارات وقبّعات | خياطة يونس',
      description: 'تطريز أسماء وأحرف أولى ونصوص وشعارات في بلاط، جبيل. نؤمّن القطعة أو تحضرونها. لا حدّ أدنى للطلب، سعر واحد، ومعاينة قبل التطريز عند الطلب.',
      ctaLabel: 'اطلبوا عرض سعر',
      sections: [
        { t: 'pagehead', eyebrow: 'التطريز', h1: 'التطريز', lede: 'أسماء وأحرف أولى ونصوص وشعارات نطرّزها في المحل. أحضروا قطعتكم أو نؤمّنها لكم. القطعة الواحدة مرحّب بها.', video: 2, trio: true },
        { t: 'chips', eyebrow: 'القطع', h2: 'على ماذا نطرّز', items: [
          ['t-shirt', 'تي شيرت'], ['t-shirt', 'بولو'], ['coat-hanger', 'هودي'], ['coat-hanger', 'كنزات'], ['baseball-cap', 'قبّعات'], ['check', 'مناشف'], ['users-three', 'زيّ موحّد'], ['check', 'حقائب'],
        ], note: 'القبّعات نطرّزها في المحل، على ماكينتنا.' },
        { t: 'twocol', cols: [
          { eyebrow: 'قطعتكم أو قطعتنا', h2: 'نؤمّن القطعة، أو تحضرونها', p: 'يمكننا تأمين تي شيرت وهودي وكنزات وقبّعات ومناشف وزيّ موحّد. أو أحضروا القطعة التي لديكم ونطرّز عليها.' },
          { eyebrow: 'ماذا نطرّز', h2: 'أسماء، نصوص، شعارات وتصاميمكم', p: 'أسماء وأحرف أولى ونصوص قصيرة وشعارات وتصاميمكم الخاصة. نحوّل كلّ تصميم رقمياً في المحل، فيصبح ملف الشعار أو صورة الخطّ اليدوي ملفّ تطريز هنا.' },
        ] },
        { t: 'process', which: 'embroidery', trio: true },
        { t: 'videos', eyebrow: 'في المحل', h2: 'الماكينة أثناء العمل', clips: [3, 4] },
        { t: 'faq', eyebrow: 'أسئلة', h2: 'عن التطريز', items: [
          ['هل هناك حدّ أدنى للطلب؟', 'لا. قطعة واحدة تكفي.'],
          ['هل تحتسبون كلفة التصميم أو التحويل الرقمي على حدة؟', 'لا. سعر واحد شامل، بلا كلفة منفصلة للتصميم أو التحويل الرقمي.'],
          ['هل يمكنني رؤية التصميم قبل التطريز؟', 'نعم. اطلبوا معاينة ونريكم إيّاها قبل التطريز.'],
          ['ماذا أرسل كتصميم؟', 'ملف الشعار إن كان لديكم. صورة واضحة لرسم أو خطّ يدوي تفي بالغرض أيضاً. أرسلوها في محادثة واتساب بعد أن يفتحها النموذج. تحتاجون مساعدة في التصميم؟ اختاروا الخانة ونعمل عليه معكم.'],
          ['هل تطرّزون على القبّعات؟', 'نعم. القبّعات نطرّزها في المحل.'],
        ] },
      ],
    },
  },

  // ───────────────────────────────── UNIFORMS
  uniforms: {
    cta: 'uniforms',
    en: {
      title: 'Uniform and team embroidery in Byblos | Younes Tailor',
      description: 'Logo embroidery on uniforms and teamwear for schools, clubs, restaurants and companies around Byblos. Mixed sizes and no minimum order.',
      ctaLabel: 'Request a quote',
      sections: [
        { t: 'pagehead', eyebrow: 'Embroidery', h1: 'Uniforms, teams & business', lede: 'Logos stitched on uniforms and teamwear for schools, clubs, restaurants and companies around Byblos.', video: 3, trio: true },
        { t: 'chips', eyebrow: 'Who it is for', h2: 'Who we stitch for', items: [
          ['users-three', 'Schools'], ['users-three', 'Clubs and teams'], ['users-three', 'Restaurants and cafés'], ['users-three', 'Companies'],
        ] },
        { t: 'list', eyebrow: 'What to tell us', h2: 'What we need to quote', items: [
          'Quantities and the size of each piece',
          'Logo placement: chest, sleeve, back or cap front',
          'Whether we supply the garments or you bring your own',
          'Your logo file, or a photo of it',
          'Your deadline',
        ] },
        { t: 'twocol', cols: [
          { eyebrow: 'Preview', h2: 'See it before we stitch', p: 'We digitise your logo in-house. Preview before stitching on request.' },
          { eyebrow: 'One price', h2: 'No setup charge for your logo', p: 'One all-in price, with no separate design or digitising charge. No minimum order.' },
        ] },
        { t: 'process', which: 'embroidery', media: { video: 4 } },
        { t: 'faq', eyebrow: 'Questions', h2: 'About uniform orders', items: [
          ['Is there a minimum order?', 'No. You can order a single shirt for a new member of staff.'],
          ['Can one order have mixed sizes?', 'Yes. Send the list of sizes and quantities with your request.'],
          ['Do you supply the uniforms?', 'We can supply tees, hoodies, sweaters, caps and uniforms, or stitch on garments you already have.'],
          ['Is there a charge for setting up our logo?', 'No. One all-in price, with no separate design or digitising charge.'],
        ] },
      ],
    },
    fr: {
      title: 'Broderie d’uniformes et d’équipes à Byblos | Younes Tailor',
      description: 'Broderie de logos sur uniformes et tenues d’équipe pour écoles, clubs, restaurants et entreprises autour de Byblos. Tailles mélangées, sans minimum de commande.',
      ctaLabel: 'Demander un devis',
      sections: [
        { t: 'pagehead', eyebrow: 'Broderie', h1: 'Uniformes, équipes & entreprises', lede: 'Des logos brodés sur les uniformes et tenues d’équipe des écoles, clubs, restaurants et entreprises autour de Byblos.', video: 3, trio: true },
        { t: 'chips', eyebrow: 'Pour qui', h2: 'Pour qui on brode', items: [
          ['users-three', 'Écoles'], ['users-three', 'Clubs et équipes'], ['users-three', 'Restaurants et cafés'], ['users-three', 'Entreprises'],
        ] },
        { t: 'list', eyebrow: 'Ce qu’il nous faut', h2: 'Pour établir le devis', items: [
          'Les quantités et la taille de chaque pièce',
          'L’emplacement du logo : poitrine, manche, dos ou devant de casquette',
          'Vêtements fournis par l’atelier ou apportés par vous',
          'Votre fichier de logo, ou une photo',
          'Votre date limite',
        ] },
        { t: 'twocol', cols: [
          { eyebrow: 'Aperçu', h2: 'Voir avant la broderie', p: 'Nous numérisons votre logo à l’atelier. Aperçu avant broderie sur demande.' },
          { eyebrow: 'Un seul prix', h2: 'Pas de frais pour votre logo', p: 'Un seul prix, tout compris, sans frais de création ou de numérisation. Pas de minimum de commande.' },
        ] },
        { t: 'process', which: 'embroidery', media: { video: 4 } },
        { t: 'faq', eyebrow: 'Questions', h2: 'À propos des commandes d’uniformes', items: [
          ['Y a-t-il un minimum de commande ?', 'Non. Vous pouvez commander un seul polo pour un nouvel employé.'],
          ['Une commande peut-elle mélanger les tailles ?', 'Oui. Envoyez la liste des tailles et des quantités avec votre demande.'],
          ['Fournissez-vous les uniformes ?', 'L’atelier peut fournir t-shirts, sweats, pulls, casquettes et uniformes, ou broder sur les vêtements que vous avez déjà.'],
          ['La mise en place du logo est-elle facturée ?', 'Non. Un seul prix, tout compris, sans frais de création ou de numérisation.'],
        ] },
      ],
    },
    ar: {
      title: 'تطريز الزيّ الموحّد والفرق في جبيل | خياطة يونس',
      description: 'تطريز الشعارات على الزيّ الموحّد وملابس الفرق للمدارس والنوادي والمطاعم والشركات في منطقة جبيل. مقاسات مختلفة وبلا حدّ أدنى للطلب.',
      ctaLabel: 'اطلبوا عرض سعر',
      sections: [
        { t: 'pagehead', eyebrow: 'التطريز', h1: 'الزيّ الموحّد والفرق والشركات', lede: 'شعارات نطرّزها على الزيّ الموحّد وملابس الفرق للمدارس والنوادي والمطاعم والشركات في منطقة جبيل.', video: 3, trio: true },
        { t: 'chips', eyebrow: 'لمن', h2: 'لمن نطرّز', items: [
          ['users-three', 'المدارس'], ['users-three', 'النوادي والفرق'], ['users-three', 'المطاعم والمقاهي'], ['users-three', 'الشركات'],
        ] },
        { t: 'list', eyebrow: 'ما نحتاجه منكم', h2: 'لنعطيكم السعر', items: [
          'الكمّيات ومقاس كلّ قطعة',
          'مكان الشعار: الصدر، الكمّ، الظهر أو مقدّمة القبّعة',
          'هل نؤمّن نحن القطع أم تحضرونها',
          'ملف الشعار، أو صورة عنه',
          'الموعد المطلوب',
        ] },
        { t: 'twocol', cols: [
          { eyebrow: 'المعاينة', h2: 'شاهدوه قبل التطريز', p: 'نحوّل شعاركم رقمياً في المحل. معاينة قبل التطريز عند الطلب.' },
          { eyebrow: 'سعر واحد', h2: 'لا كلفة لتجهيز شعاركم', p: 'سعر واحد شامل، بلا كلفة منفصلة للتصميم أو التحويل الرقمي. لا حدّ أدنى للطلب.' },
        ] },
        { t: 'process', which: 'embroidery', media: { video: 4 } },
        { t: 'faq', eyebrow: 'أسئلة', h2: 'عن طلبات الزيّ الموحّد', items: [
          ['هل هناك حدّ أدنى للطلب؟', 'لا. يمكنكم طلب قميص واحد لموظّف جديد.'],
          ['هل يمكن أن يضمّ الطلب مقاسات مختلفة؟', 'نعم. أرسلوا لائحة المقاسات والكمّيات مع طلبكم.'],
          ['هل تؤمّنون الزيّ الموحّد؟', 'يمكننا تأمين تي شيرت وهودي وكنزات وقبّعات وزيّ موحّد، أو التطريز على قطع لديكم.'],
          ['هل تحتسبون كلفة لتجهيز شعارنا؟', 'لا. سعر واحد شامل، بلا كلفة منفصلة للتصميم أو التحويل الرقمي.'],
        ] },
      ],
    },
  },

  // ───────────────────────────────── ABOUT
  about: {
    cta: 'general',
    en: {
      title: 'About Younes Tailor — a tailor in Blat, Byblos',
      description: 'Younes Tailor opened in 2025 in Blat, Byblos. A small neighbourhood shop for alterations, repairs and embroidery, in Arabic, French or English.',
      ctaLabel: 'Tell us what you need',
      sections: [
        { t: 'pagehead', eyebrow: 'About', h1: 'About Younes Tailor', lede: 'A neighbourhood tailor in Blat, Byblos. Alterations, repairs and embroidery, for men and women, in Arabic, French or English.', image: 'storefront' },
        { t: 'prose', eyebrow: 'Why we opened', h2: 'A neighbourhood tailor, done properly', paras: [
          'Younes Tailor opened in 2025 in Blat, near Byblos. The idea was simple: a nearby place you can trust to take up a hem, replace a zip, take in a dress or get a suit sitting right, without paying for more than you need.',
          'We are a small, independent shop, not a chain. What we do, we do carefully: measured on you, finished by hand and pressed before it leaves. If something is not worth altering, we say so.',
          'Embroidery sits on the same bench: names, initials and logos, digitised and stitched in the shop, from a single cap to a set of uniforms.',
        ] },
        { t: 'values', eyebrow: 'How we work', h2: 'How we like to work', items: [
          ['Finished by hand', 'Checked on you, sewn and pressed in the shop.'],
          ['Straight answers', 'If a garment is not worth altering, we tell you, even when it costs us the job.'],
          ['Price first', 'You get the price before any work starts. No surprises at collection.'],
          ['Three languages', 'Arabic, French or English, whichever is easiest for you.'],
        ] },
        { t: 'groups', eyebrow: 'What we do', h2: 'Two kinds of work', groups: [
          { id: 'tailoring', title: 'Tailoring', cards: [
            { key: 'alterations', text: 'Hems, take-ins, tapering and wedding fittings.' },
            { key: 'repairs', text: 'Zips, seams, linings and older pieces.' },
          ] },
          { id: 'embroidery', title: 'Embroidery', cards: [
            { key: 'embroidery', text: 'Names, initials, text and logos. No minimum order.' },
            { key: 'uniforms', text: 'Schools, clubs, restaurants and companies.' },
          ] },
        ] },
        { t: 'faq', eyebrow: 'Questions', h2: 'About the shop', items: [
          ['Are you a new shop?', 'Yes. Younes Tailor opened in 2025 in Blat. We are a small, independent neighbourhood tailor.'],
          ['What do you do?', 'Alterations and repairs, including wedding fittings and careful work on older pieces, plus embroidery of names, initials, text and logos.'],
          ['Do you make clothes from scratch?', 'Not on the tailoring side: we work on clothes you already own. For embroidery we can supply the blank garment.'],
          ['What languages can I be served in?', 'Arabic, French and English.'],
        ] },
      ],
    },
    fr: {
      title: 'À propos de Younes Tailor — un tailleur à Blat, Byblos',
      description: 'Younes Tailor a ouvert en 2025 à Blat, Byblos. Un petit atelier de quartier pour les retouches, réparations et la broderie, en arabe, français ou anglais.',
      ctaLabel: 'Dites-nous ce qu’il vous faut',
      sections: [
        { t: 'pagehead', eyebrow: 'À propos', h1: 'À propos de Younes Tailor', lede: 'Un tailleur de quartier à Blat, Byblos. Retouches, réparations et broderie, pour hommes et femmes, en arabe, français ou anglais.', image: 'storefront' },
        { t: 'prose', eyebrow: 'Pourquoi cet atelier', h2: 'Un tailleur de quartier qui fait les choses bien', paras: [
          'Younes Tailor a ouvert en 2025 à Blat, près de Byblos. L’idée était simple : un endroit proche et fiable pour un ourlet, une fermeture, une robe reprise ou un costume qui tombe juste, sans payer plus que nécessaire.',
          'Nous sommes un petit atelier indépendant, pas une chaîne. Ce que nous faisons, nous le faisons avec soin : mesuré sur vous, fini à la main et repassé avant de partir. Si un vêtement ne vaut pas la retouche, on vous le dit.',
          'La broderie se fait au même établi : noms, initiales et logos, numérisés et brodés à l’atelier, d’une seule casquette à une série d’uniformes.',
        ] },
        { t: 'values', eyebrow: 'Notre façon de faire', h2: 'Comment nous travaillons', items: [
          ['Fini à la main', 'Vérifié sur vous, cousu et repassé à l’atelier.'],
          ['Des réponses franches', 'Si un vêtement ne vaut pas la retouche, on vous le dit, même si on perd le travail.'],
          ['Le prix d’abord', 'Le prix est donné avant tout travail. Aucune surprise au retrait.'],
          ['Trois langues', 'Arabe, français ou anglais, selon ce qui vous convient.'],
        ] },
        { t: 'groups', eyebrow: 'Nos métiers', h2: 'Deux métiers', groups: [
          { id: 'tailoring', title: 'Couture', cards: [
            { key: 'alterations', text: 'Ourlets, reprises, ajustements et essayages de mariage.' },
            { key: 'repairs', text: 'Fermetures, coutures, doublures et pièces anciennes.' },
          ] },
          { id: 'embroidery', title: 'Broderie', cards: [
            { key: 'embroidery', text: 'Noms, initiales, textes et logos. Pas de minimum.' },
            { key: 'uniforms', text: 'Écoles, clubs, restaurants et entreprises.' },
          ] },
        ] },
        { t: 'faq', eyebrow: 'Questions', h2: 'À propos de l’atelier', items: [
          ['L’atelier est-il nouveau ?', 'Oui. Younes Tailor a ouvert en 2025 à Blat. C’est un petit atelier de quartier indépendant.'],
          ['Que faites-vous ?', 'Des retouches et des réparations, dont les essayages de mariage et le travail soigné sur les pièces anciennes, et la broderie de noms, initiales, textes et logos.'],
          ['Faites-vous des vêtements sur mesure ?', 'Pas en couture : nous travaillons sur les vêtements que vous avez déjà. En broderie, l’atelier peut fournir l’article.'],
          ['Quelles langues parle-t-on à l’atelier ?', 'Arabe, français et anglais.'],
        ] },
      ],
    },
    ar: {
      title: 'من نحن — خياطة يونس في بلاط، جبيل',
      description: 'افتُتحت خياطة يونس عام 2025 في بلاط، جبيل. محل صغير في الحيّ للتعديل والتصليح والتطريز، بالعربية أو الفرنسية أو الإنكليزية.',
      ctaLabel: 'أخبرونا بما تحتاجونه',
      sections: [
        { t: 'pagehead', eyebrow: 'من نحن', h1: 'عن خياطة يونس', lede: 'خيّاط الحيّ في بلاط، جبيل. تعديل وتصليح وتطريز، للرجال والنساء، بالعربية أو الفرنسية أو الإنكليزية.', image: 'storefront' },
        { t: 'prose', eyebrow: 'لماذا افتتحنا', h2: 'خيّاط الحيّ، كما يجب', paras: [
          'افتُتحت خياطة يونس عام 2025 في بلاط، قرب جبيل. الفكرة بسيطة: مكان قريب تثقون به لتقصير قطعة، أو تبديل سحّاب، أو تضييق فستان، أو ضبط بدلة، من دون أن تدفعوا أكثر ممّا تحتاجون.',
          'نحن محل صغير ومستقلّ، لا سلسلة. وما نعمله نعمله بعناية: قياس عليكم، إنهاء باليد، وكيّ قبل أن تخرج القطعة. وإن كانت القطعة لا تستحقّ التعديل، نقول لكم ذلك.',
          'والتطريز على الطاولة نفسها: أسماء وأحرف أولى وشعارات، نحوّلها رقمياً ونطرّزها في المحل، من قبّعة واحدة إلى طقم زيّ موحّد.',
        ] },
        { t: 'values', eyebrow: 'طريقتنا', h2: 'كيف نحبّ أن نعمل', items: [
          ['إنهاء باليد', 'نتأكّد منها عليكم، ونخيطها ونكويها في المحل.'],
          ['أجوبة صريحة', 'إن كانت القطعة لا تستحقّ التعديل نقول لكم، حتى لو خسرنا العمل.'],
          ['السعر أولاً', 'تعرفون السعر قبل أيّ عمل. لا مفاجآت عند الاستلام.'],
          ['ثلاث لغات', 'العربية أو الفرنسية أو الإنكليزية، الأسهل عليكم.'],
        ] },
        { t: 'groups', eyebrow: 'ما نعمله', h2: 'نوعان من العمل', groups: [
          { id: 'tailoring', title: 'الخياطة', cards: [
            { key: 'alterations', text: 'تقصير، تضييق، ضبط القَصّة وقياسات الأعراس.' },
            { key: 'repairs', text: 'سحّابات، خياطات، بطانات وقطع قديمة.' },
          ] },
          { id: 'embroidery', title: 'التطريز', cards: [
            { key: 'embroidery', text: 'أسماء، أحرف أولى، نصوص وشعارات. لا حدّ أدنى للطلب.' },
            { key: 'uniforms', text: 'مدارس، نوادٍ، مطاعم وشركات.' },
          ] },
        ] },
        { t: 'faq', eyebrow: 'أسئلة', h2: 'عن المحل', items: [
          ['هل المحل جديد؟', 'نعم. افتُتحت خياطة يونس عام 2025 في بلاط. نحن خيّاط حيّ صغير ومستقلّ.'],
          ['ماذا تعملون؟', 'التعديل والتصليح، ومنها قياسات الأعراس والعناية بالقطع القديمة، إضافة إلى تطريز الأسماء والأحرف الأولى والنصوص والشعارات.'],
          ['هل تفصّلون ملابس جديدة؟', 'ليس في قسم الخياطة: نعمل على ملابس تملكونها. أما للتطريز فيمكننا تأمين القطعة.'],
          ['بأيّ لغة يمكنني التحدّث؟', 'العربية والفرنسية والإنكليزية.'],
        ] },
      ],
    },
  },

  // ───────────────────────────────── VISIT
  visit: {
    cta: 'general',
    en: {
      title: 'Visit Younes Tailor in Blat, Byblos — hours and directions',
      description: 'Younes Tailor, Blat, Jbeil (Byblos) District, Mount Lebanon. Open Mon–Sat 09:00–19:00, Sunday closed. Phone and WhatsApp +961 3 128 413. Map and directions.',
      ctaLabel: 'Tell us what you need',
      sections: [
        { t: 'pagehead', eyebrow: 'Visit', h1: 'Visit the shop', lede: 'In Blat, a few minutes from Byblos old town. Walk in during opening hours, or message us first so we can set time aside.' },
        { t: 'visitfull', areasTitle: 'Areas we serve', areas: ['Blat', 'Byblos', 'Amchit', 'Halat', 'Fidar', 'Kfaryassine', 'Mastita'],
          reviews: { h: 'Google reviews', p: 'We do not publish ratings or testimonials on this site. If we have worked on something for you, a Google review helps neighbours find us.', link: 'Open our Google Business Profile' } },
        { t: 'faq', eyebrow: 'Questions', h2: 'About visiting', items: [
          ['Is there parking near the shop?', 'Call or message us before you drive over and we will tell you the easiest place to park in Blat.'],
          ['Do I need an appointment?', 'Walk-ins are welcome during opening hours. For a wedding outfit, a large embroidery order or a bigger job, message us first so we can set time aside.'],
          ['Do you serve customers outside Blat?', 'Yes. Customers come from Byblos, Amchit, Halat, Fidar and other towns. If you are further away, send a photo first and we will tell you whether the trip is worth it.'],
        ] },
      ],
    },
    fr: {
      title: 'Nous trouver — Younes Tailor à Blat, Byblos, horaires et itinéraire',
      description: 'Younes Tailor, Blat, district de Jbeil (Byblos), Mont-Liban. Ouvert lun–sam 09:00–19:00, dimanche fermé. Téléphone et WhatsApp +961 3 128 413. Plan et itinéraire.',
      ctaLabel: 'Dites-nous ce qu’il vous faut',
      sections: [
        { t: 'pagehead', eyebrow: 'Nous trouver', h1: 'Venir à l’atelier', lede: 'À Blat, à quelques minutes du vieux Byblos. Passez pendant les heures d’ouverture, ou écrivez-nous avant pour qu’on vous réserve un moment.' },
        { t: 'visitfull', areasTitle: 'Secteurs desservis', areas: ['Blat', 'Byblos', 'Amchit', 'Halat', 'Fidar', 'Kfaryassine', 'Mastita'],
          reviews: { h: 'Avis Google', p: 'Nous ne publions ni notes ni témoignages sur ce site. Si nous avons travaillé pour vous, un avis Google aide vos voisins à nous trouver.', link: 'Voir notre fiche Google' } },
        { t: 'faq', eyebrow: 'Questions', h2: 'Pour venir', items: [
          ['Peut-on se garer près de l’atelier ?', 'Appelez-nous ou écrivez-nous avant de prendre la route et on vous indiquera où vous garer le plus facilement à Blat.'],
          ['Faut-il un rendez-vous ?', 'Vous pouvez passer sans rendez-vous pendant les heures d’ouverture. Pour une tenue de mariage, une grosse commande de broderie ou un travail important, écrivez-nous avant pour qu’on vous réserve du temps.'],
          ['Recevez-vous des clients hors de Blat ?', 'Oui. Des clients viennent de Byblos, Amchit, Halat, Fidar et d’autres villages. Si vous êtes plus loin, envoyez d’abord une photo et on vous dira si le trajet en vaut la peine.'],
        ] },
      ],
    },
    ar: {
      title: 'زورونا — خياطة يونس في بلاط، جبيل، ساعات العمل والاتجاهات',
      description: 'خياطة يونس، بلاط، قضاء جبيل، جبل لبنان. مفتوح الاثنين–السبت 09:00–19:00، الأحد مغلق. هاتف وواتساب ‎+961 3 128 413. الخريطة والاتجاهات.',
      ctaLabel: 'أخبرونا بما تحتاجونه',
      sections: [
        { t: 'pagehead', eyebrow: 'زورونا', h1: 'زوروا المحل', lede: 'في بلاط، على بعد دقائق من جبيل القديمة. تفضّلوا خلال ساعات العمل، أو راسلونا قبلها لنخصّص لكم وقتاً.' },
        { t: 'visitfull', areasTitle: 'المناطق التي نخدمها', areas: ['بلاط', 'جبيل', 'عمشيت', 'حالات', 'الفيدار', 'كفرياسين', 'مستيتا'],
          reviews: { h: 'تقييمات Google', p: 'لا ننشر تقييمات أو شهادات على هذا الموقع. إن كنّا عملنا لكم شيئاً، تقييمكم على Google يساعد الجيران على إيجادنا.', link: 'صفحتنا على Google' } },
        { t: 'faq', eyebrow: 'أسئلة', h2: 'عن الزيارة', items: [
          ['هل يوجد موقف سيارات قرب المحل؟', 'اتصلوا بنا أو راسلونا قبل أن تنطلقوا ونقول لكم أسهل مكان للركن في بلاط.'],
          ['هل أحتاج إلى موعد؟', 'تفضّلوا من دون موعد خلال ساعات العمل. لثوب عرس أو طلب تطريز كبير أو عمل أكبر، راسلونا قبلها لنخصّص لكم وقتاً.'],
          ['هل تخدمون زبائن من خارج بلاط؟', 'نعم. يأتي زبائن من جبيل وعمشيت وحالات والفيدار وبلدات أخرى. إن كنتم أبعد، أرسلوا صورة أولاً ونقول لكم إن كانت الزيارة تستحقّ.'],
        ] },
      ],
    },
  },
};
