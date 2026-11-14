// Launch 2 — Decision 06 (owner approved 14 Nov 2026): new logo, slogan, Uniforms as the first main service.
// Facts (owner, 14 Nov): the shop supplies uniform garments (polos, shirts, aprons, chef jackets, caps,
// tees, hoodies, sweaters) and embroiders them; it does not sew uniforms. Pieces can be added to an order later.
// This file layers the Launch 2 text over the Launch 1 content; approved Launch 1 strings are reused as they are.

export const SLOGAN = {
  en: 'Tailoring · Embroidery · Uniforms',
  fr: 'Couture · Broderie · Uniformes',
  ar: 'خياطة · تطريز · زيّ موحّد',
};

const HOME2 = {
  en: {
    title: 'Younes Tailor — Uniforms, embroidery and tailoring in Blat, Byblos',
    description: 'Uniforms supplied and embroidered with your logo, custom embroidery, alterations and repairs in Blat, Byblos. No minimum order. Open Mon–Sat 9:00–19:00.',
    h1: 'Uniforms, embroidery and tailoring in Blat, Byblos',
    em: ['Uniforms,', 'embroidery', 'tailoring'],
    lede: 'We supply uniforms and stitch your logo on them, embroider names and designs on tees, hoodies, caps and towels, and alter and repair the clothes you already own. Walk in, or send a photo first.',
    btnUniforms: 'Uniforms', uTitle: 'Uniforms', uBtn: 'Uniforms',
    uLine: 'Polos, shirts, aprons, chef jackets and caps, supplied by us and stitched with your logo. For restaurants, schools, clubs and companies.',
    uItems: ['Polos', 'Shirts', 'Aprons', 'Chef jackets', 'Caps'],
    scratchA: 'No, we work on clothes you already own. For embroidery and uniforms we supply ready-made items: polos, shirts, aprons, chef jackets, tees, hoodies, caps and towels.',
    optUniforms: 'Uniforms',
  },
  fr: {
    title: 'Younes Tailor — Uniformes, broderie et couture à Blat, Byblos',
    description: 'Uniformes fournis et brodés à votre logo, broderie personnalisée, retouches et réparations à Blat, Byblos. Sans minimum de commande. Ouvert du lundi au samedi, 9 h–19 h.',
    h1: 'Uniformes, broderie et couture à Blat, Byblos',
    em: ['Uniformes,', 'broderie', 'couture'],
    lede: 'Nous fournissons des uniformes brodés à votre logo, brodons noms et motifs sur t-shirts, sweats, casquettes et serviettes, et retouchons et réparons les vêtements que vous avez déjà. Passez à l’atelier, ou envoyez d’abord une photo.',
    btnUniforms: 'Uniformes', uTitle: 'Uniformes', uBtn: 'Uniformes',
    uLine: 'Polos, chemises, tabliers, vestes de cuisine et casquettes, fournis par l’atelier et brodés à votre logo. Pour restaurants, écoles, clubs et entreprises.',
    uItems: ['Polos', 'Chemises', 'Tabliers', 'Vestes de cuisine', 'Casquettes'],
    scratchA: 'Non, nous travaillons sur les vêtements que vous avez déjà. Pour la broderie et les uniformes, nous fournissons des articles prêts à porter : polos, chemises, tabliers, vestes de cuisine, t-shirts, sweats, casquettes et serviettes.',
    optUniforms: 'Uniformes',
  },
  ar: {
    title: 'خياطة يونس — زيّ موحّد وتطريز وخياطة في بلاط، جبيل',
    description: 'زيّ موحّد نؤمّنه ونطرّز شعاركم عليه، وتطريز حسب الطلب، وتعديل الملابس وتصليحها في بلاط، جبيل. من دون حدّ أدنى للطلب. مفتوح من الاثنين إلى السبت، ٩:٠٠–١٩:٠٠.',
    h1: 'زيّ موحّد وتطريز وخياطة في بلاط، جبيل',
    em: [],
    lede: 'نؤمّن الزيّ الموحّد ونطرّز شعاركم عليه، ونطرّز الأسماء والتصاميم على التيشيرتات والهوديات والقبّعات والمناشف، ونعدّل ملابسكم ونصلّحها. زورونا مباشرة، أو أرسلوا لنا صورة أولاً.',
    btnUniforms: 'الزيّ الموحّد', uTitle: 'الزيّ الموحّد', uBtn: 'الزيّ الموحّد',
    uLine: 'قمصان بولو وقمصان ومراييل وسترات طهاة وقبّعات، نؤمّنها ونطرّز شعاركم عليها. للمطاعم والمدارس والنوادي والشركات.',
    uItems: ['قمصان بولو', 'قمصان', 'مراييل', 'سترات طهاة', 'قبّعات'],
    scratchA: 'لا، نعمل على الملابس التي عندكم. للتطريز والزيّ الموحّد نؤمّن قطعاً جاهزة: قمصان بولو وقمصان ومراييل وسترات طهاة وتيشيرتات وهوديات وقبّعات ومناشف.',
    optUniforms: 'الزيّ الموحّد',
  },
};

export function applyHome(HOME) {
  for (const lang of ['en', 'fr', 'ar']) {
    const h = HOME[lang], n = HOME2[lang];
    const { scratchA, optUniforms, ...fields } = n;
    Object.assign(h, fields, { slogan: SLOGAN[lang], ePills: [h.ePills[0]] });
    h.faq[3] = [h.faq[3][0], scratchA];          // "Do you make clothes from scratch?"
    h.fServiceOpts[3] = optUniforms;
  }
}

const UNI = {
  en: {
    title: 'Uniforms with your logo in Byblos | Younes Tailor',
    description: 'We supply polos, shirts, aprons, chef jackets and caps and embroider your logo on them, for restaurants, schools, clubs and companies around Byblos. No minimum order.',
    eyebrow: 'Uniforms', h1: 'Uniforms with your logo',
    lede: 'We supply the garments and stitch your logo on them in our shop in Blat, Byblos. For one new employee or a whole team.',
    supply: { eyebrow: 'Garments', h2: 'What we supply', items: ['Polos', 'Shirts', 'Aprons', 'Chef jackets', 'Caps', 'Tees, hoodies and sweaters'], note: 'Already have your uniforms? Bring them and we stitch your logo on those.' },
    place: { eyebrow: 'Placement', h2: 'Where the logo goes', items: ['Chest, left or right', 'Sleeve', 'Back', 'Cap front'], note: 'Not sure? Send a photo of the garment and we suggest a placement.' },
    cols: [
      { eyebrow: 'Reorders', h2: 'Add pieces later', p: 'New staff, or two more hoodies than planned? Order the extra pieces when you need them, on the same terms. No minimum order.' },
      { eyebrow: 'Fit', h2: 'Uniforms that fit', p: 'We do not sew uniforms from scratch. We supply ready-made garments, and our tailoring side hems, shortens and takes in the pieces that need it.' },
    ],
    faq: {
      supply: ['Do you supply the uniforms?', 'Yes. We supply polos, shirts, aprons, chef jackets, caps, tees, hoodies and sweaters, and stitch your logo on them. You can also bring garments you already have.'],
      sew: ['Do you sew uniforms from scratch?', 'No. We supply ready-made garments and embroider them. We can alter them if the fit needs it.'],
      add: ['Can we add pieces later?', 'Yes. Order the extra pieces when you need them, on the same terms.'],
      time: ['How long does an order take?', 'It depends on the quantity. We give you a date with the quote.'],
      pay: ['How do we pay?', 'Cash only.'],
    },
    links: { h2: 'Related services', items: [['alterations', 'Alterations & fitting'], ['embroidery', 'Embroidery: names, logos, caps, towels'], ['visit', 'Find the shop and opening hours']] },
  },
  fr: {
    title: 'Uniformes brodés à votre logo à Byblos | Younes Tailor',
    description: 'Polos, chemises, tabliers, vestes de cuisine et casquettes fournis et brodés à votre logo, pour restaurants, écoles, clubs et entreprises à Byblos. Sans minimum.',
    eyebrow: 'Uniformes', h1: 'Uniformes à votre logo',
    lede: 'Nous fournissons les vêtements et brodons votre logo à l’atelier, à Blat, Byblos. Pour un nouvel employé comme pour toute une équipe.',
    supply: { eyebrow: 'Vêtements', h2: 'Ce que nous fournissons', items: ['Polos', 'Chemises', 'Tabliers', 'Vestes de cuisine', 'Casquettes', 'T-shirts, sweats à capuche et pulls'], note: 'Vous avez déjà vos uniformes ? Apportez-les, nous brodons votre logo dessus.' },
    place: { eyebrow: 'Emplacement', h2: 'Où placer le logo', items: ['Poitrine, à gauche ou à droite', 'Manche', 'Dos', 'Devant de casquette'], note: 'Un doute ? Envoyez une photo du vêtement et nous vous proposons un emplacement.' },
    cols: [
      { eyebrow: 'Réassort', h2: 'Ajouter des pièces plus tard', p: 'Un nouvel employé, ou deux sweats de plus que prévu ? Commandez les pièces supplémentaires quand vous en avez besoin, aux mêmes conditions. Sans minimum de commande.' },
      { eyebrow: 'Ajustement', h2: 'Des uniformes à la bonne taille', p: 'Nous ne confectionnons pas d’uniformes. Nous fournissons des vêtements prêts à porter, et notre atelier de couture raccourcit, reprend et ajuste les pièces qui en ont besoin.' },
    ],
    faq: {
      supply: ['Fournissez-vous les uniformes ?', 'Oui. Nous fournissons polos, chemises, tabliers, vestes de cuisine, casquettes, t-shirts, sweats et pulls, et nous y brodons votre logo. Vous pouvez aussi apporter vos propres vêtements.'],
      sew: ['Confectionnez-vous des uniformes ?', 'Non. Nous fournissons des vêtements prêts à porter et nous les brodons. Nous pouvons les retoucher si la taille l’exige.'],
      add: ['Peut-on ajouter des pièces plus tard ?', 'Oui. Commandez les pièces supplémentaires quand vous en avez besoin, aux mêmes conditions.'],
      time: ['Quel est le délai ?', 'Cela dépend de la quantité. Nous vous donnons une date avec le devis.'],
      pay: ['Comment payer ?', 'En espèces uniquement.'],
    },
    links: { h2: 'Services liés', items: [['alterations', 'Retouches et ajustements'], ['embroidery', 'Broderie : noms, logos, casquettes, serviettes'], ['visit', 'Trouver l’atelier et les horaires']] },
  },
  ar: {
    title: 'زيّ موحّد مطرّز بشعاركم في جبيل | خياطة يونس',
    description: 'نؤمّن قمصان البولو والقمصان والمراييل وسترات الطهاة والقبّعات ونطرّز شعاركم عليها، للمطاعم والمدارس والنوادي والشركات في جبيل وجوارها. من دون حدّ أدنى للطلب.',
    eyebrow: 'الزيّ الموحّد', h1: 'زيّ موحّد بشعاركم',
    lede: 'نؤمّن الملابس ونطرّز شعاركم عليها في محلّنا في بلاط، جبيل. لموظّف جديد واحد أو لفريق كامل.',
    supply: { eyebrow: 'الملابس', h2: 'ما نؤمّنه', items: ['قمصان بولو', 'قمصان', 'مراييل', 'سترات طهاة', 'قبّعات', 'تيشيرتات وهوديات وكنزات'], note: 'عندكم زيّكم الموحّد؟ أحضروه ونطرّز شعاركم عليه.' },
    place: { eyebrow: 'مكان الشعار', h2: 'أين نضع الشعار', items: ['الصدر، يميناً أو يساراً', 'الكمّ', 'الظهر', 'مقدّمة القبّعة'], note: 'لستم متأكدين؟ أرسلوا صورة القطعة ونقترح عليكم المكان المناسب.' },
    cols: [
      { eyebrow: 'طلبات إضافية', h2: 'أضيفوا قطعاً لاحقاً', p: 'موظّف جديد، أو هوديان أكثر من المتوقّع؟ اطلبوا القطع الإضافية عند الحاجة، بالشروط نفسها. من دون حدّ أدنى للطلب.' },
      { eyebrow: 'القياس', h2: 'زيّ على القياس', p: 'لا نخيّط الزيّ الموحّد من الصفر. نؤمّن ملابس جاهزة، وقسم الخياطة عندنا يقصّر ويضيّق ويعدّل القطع التي تحتاج إلى ذلك.' },
    ],
    faq: {
      supply: ['هل تؤمّنون الزيّ الموحّد؟', 'نعم. نؤمّن قمصان البولو والقمصان والمراييل وسترات الطهاة والقبّعات والتيشيرتات والهوديات والكنزات، ونطرّز شعاركم عليها. ويمكنكم أيضاً إحضار ملابسكم.'],
      sew: ['هل تخيّطون الزيّ الموحّد من الصفر؟', 'لا. نؤمّن ملابس جاهزة ونطرّزها. ويمكننا تعديلها إذا احتاج القياس إلى ذلك.'],
      add: ['هل يمكن إضافة قطع لاحقاً؟', 'نعم. اطلبوا القطع الإضافية عند الحاجة، بالشروط نفسها.'],
      time: ['كم يستغرق الطلب؟', 'بحسب الكمية. نعطيكم موعداً مع السعر.'],
      pay: ['كيف ندفع؟', 'نقداً فقط.'],
    },
    links: { h2: 'خدمات مرتبطة', items: [['alterations', 'تعديل وضبط القياس'], ['embroidery', 'التطريز: أسماء وشعارات وقبّعات ومناشف'], ['visit', 'موقع المحل وساعات العمل']] },
  },
};

const SVC = {
  en: { title: 'Services — uniforms, embroidery and tailoring in Byblos | Younes Tailor', description: 'Uniforms with your logo, embroidery, alterations and repairs at Younes Tailor in Blat, Byblos. Pick the closest service or tell us what you need.', h1: 'Uniforms, embroidery and tailoring', lede: 'Three kinds of work in one shop in Blat, Byblos. Pick the closest one, or just tell us what you need.', gTitle: 'Uniforms', gIntro: 'Garments supplied by us, stitched with your logo.' },
  fr: { title: 'Services — uniformes, broderie et couture à Byblos | Younes Tailor', description: 'Uniformes à votre logo, broderie, retouches et réparations chez Younes Tailor à Blat, Byblos. Choisissez le service le plus proche ou dites-nous ce qu’il vous faut.', h1: 'Uniformes, broderie et couture', lede: 'Trois métiers dans un même atelier à Blat, Byblos. Choisissez le plus proche, ou dites-nous simplement ce qu’il vous faut.', gTitle: 'Uniformes', gIntro: 'Des vêtements fournis par l’atelier, brodés à votre logo.' },
  ar: { title: 'الخدمات — زيّ موحّد وتطريز وخياطة في جبيل | خياطة يونس', description: 'زيّ موحّد بشعاركم، تطريز، تعديل وتصليح الملابس في خياطة يونس في بلاط، جبيل. اختاروا الخدمة الأقرب أو أخبرونا بما تحتاجون.', h1: 'زيّ موحّد وتطريز وخياطة', lede: 'ثلاثة أنواع من العمل في محل واحد في بلاط، جبيل. اختاروا الأقرب، أو أخبرونا بما تحتاجون.', gTitle: 'الزيّ الموحّد', gIntro: 'ملابس نؤمّنها ونطرّز شعاركم عليها.' },
};

const CROSS = {
  embroidery: { en: ['Ordering for a team or a business?', 'Uniforms with your logo'], fr: ['Une commande pour une équipe ou une entreprise ?', 'Uniformes à votre logo'], ar: ['طلب لفريق أو شركة؟', 'زيّ موحّد بشعاركم'] },
  alterations: { en: ['Need uniforms too?', 'Uniforms with your logo'], fr: ['Besoin d’uniformes aussi ?', 'Uniformes à votre logo'], ar: ['تحتاجون إلى زيّ موحّد أيضاً؟', 'زيّ موحّد بشعاركم'] },
};

export function applyPages(PAGES) {
  for (const lang of ['en', 'fr', 'ar']) {
    // Uniforms page: keep the approved Launch 1 blocks (who it is for, what to tell us, process, 3 answers), add the rest.
    const old = PAGES.uniforms[lang], n = UNI[lang];
    const by = (t) => old.sections.find((s) => s.t === t);
    const of = by('faq');
    PAGES.uniforms[lang] = {
      title: n.title, description: n.description, ctaLabel: old.ctaLabel,
      sections: [
        { ...by('pagehead'), eyebrow: n.eyebrow, h1: n.h1, lede: n.lede },
        by('chips'),
        { t: 'list', ...n.supply },
        { t: 'list', ...n.place },
        by('list'),
        by('process'),
        { t: 'twocol', cols: n.cols },
        { ...of, items: [of.items[0], n.faq.supply, n.faq.sew, of.items[1], of.items[3], n.faq.add, n.faq.time, n.faq.pay] },
        { t: 'links', ...n.links },
        { t: 'visit' },
      ],
    };
    // Services overview: three groups, Uniforms first.
    const sp = PAGES.services[lang], s = SVC[lang];
    sp.title = s.title; sp.description = s.description;
    Object.assign(sp.sections.find((x) => x.t === 'pagehead'), { h1: s.h1, lede: s.lede });
    const g = sp.sections.find((x) => x.t === 'groups');
    const emb = g.groups.find((x) => x.id === 'embroidery'), tail = g.groups.find((x) => x.id === 'tailoring');
    const uCard = emb.cards.find((c) => c.key === 'uniforms');
    emb.cards = emb.cards.filter((c) => c.key !== 'uniforms');
    g.groups = [{ id: 'uniforms', title: s.gTitle, intro: s.gIntro, cards: [uCard] }, emb, tail];
    // Cross links to Uniforms from Embroidery and Alterations.
    for (const k of ['embroidery', 'alterations']) {
      const secs = PAGES[k][lang].sections, i = secs.findIndex((x) => x.t === 'faq');
      secs.splice(i < 0 ? secs.length : i, 0, { t: 'links', h2: CROSS[k][lang][0], items: [['uniforms', CROSS[k][lang][1]]] });
    }
  }
}
