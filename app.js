/**
 * ElectroWat DB — single-page scroll site
 */

const RECORDS = [
  { id: "EW-2024-1842", pollutant: "PFOA", concentration: "50 μg/L", process: "eo", processLabel: "EO", electrode: "bdd", electrodeLabel: "BDD", removal: 96.2, energy: "12.4 kWh·m⁻³", doi: "10.1021/est.2023.04821" },
  { id: "EW-2024-1203", pollutant: "苯酚", pollutantEn: "Phenol", concentration: "20 mg/L", process: "eo", processLabel: "EO", electrode: "pbo2", electrodeLabel: "PbO₂", removal: 88.5, energy: "8.7 kWh·m⁻³", doi: "10.1016/j.watres.2023.120456" },
  { id: "EW-2023-9912", pollutant: "四环素", pollutantEn: "Tetracycline", concentration: "10 mg/L", process: "ef", processLabel: "EF", electrode: "iro2", electrodeLabel: "Ti/IrO₂", removal: 91.3, energy: "15.2 kWh·m⁻³", doi: "10.1016/j.cej.2023.145892" },
  { id: "EW-2024-0567", pollutant: "PFOS", concentration: "100 μg/L", process: "eo", processLabel: "EO", electrode: "bdd", electrodeLabel: "BDD", removal: 94.8, energy: "18.1 kWh·m⁻³", doi: "10.1021/acs.est.2024.01234" },
  { id: "EW-2023-7741", pollutant: "亚甲基蓝", pollutantEn: "MB", concentration: "50 mg/L", process: "eo", processLabel: "EO", electrode: "sno2", electrodeLabel: "Ti/SnO₂", removal: 82.1, energy: "6.3 kWh·m⁻³", doi: "10.1016/j.seppur.2023.123987" },
  { id: "EW-2024-3301", pollutant: "Cr(VI)", pollutantEn: "Cr(VI)", concentration: "5 mg/L", process: "ec", processLabel: "EC", electrode: "iro2", electrodeLabel: "Al 阳极", electrodeLabelEn: "Al anode", removal: 99.1, energy: "4.2 kWh·m⁻³", doi: "10.1016/j.jece.2024.112045" },
  { id: "EW-2023-5589", pollutant: "双酚 A", pollutantEn: "BPA", concentration: "15 mg/L", process: "ef", processLabel: "EF", electrode: "bdd", electrodeLabel: "BDD", removal: 87.6, energy: "11.8 kWh·m⁻³", doi: "10.1016/j.watres.2023.119234" },
  { id: "EW-2024-2108", pollutant: "草甘膦", pollutantEn: "Glyphosate", concentration: "25 mg/L", process: "eo", processLabel: "EO", electrode: "pbo2", electrodeLabel: "PbO₂", removal: 79.4, energy: "9.5 kWh·m⁻³", doi: "10.1016/j.apcatb.2024.123890" },
];

const DOMAINS = [
  {
    abbr: "EO",
    titleZh: "电化学氧化",
    titleEn: "Electrochemical Oxidation",
    count: "12,218",
    descZh:
      "羟基自由基、活性氯等间接氧化路径，涵盖 BDD、DSA 等阳极体系。平台系统收录电流密度、电解质组成、pH 与污染物初始浓度等关键工艺参数，并关联降解中间产物与矿化程度指标。支持跨文献、跨阳极材料的去除率与比能耗对比，服务于反应路径甄别、工艺优化与放大设计。",
    descEn:
      "Indirect oxidation via hydroxyl radicals, active chlorine, and related pathways on BDD, DSA, and other anodes. The database links current density, electrolyte composition, pH, initial pollutant levels, intermediates, and mineralization metrics. Cross-study benchmarks of removal and specific energy support pathway analysis, process optimization, and scale-up.",
  },
  {
    abbr: "EF",
    titleZh: "电芬顿",
    titleEn: "Electro-Fenton",
    count: "5,156",
    descZh:
      "以 Fe²⁺/Fe³⁺ 催化 H₂O₂ 原位生成为核心，面向抗生素、染料等难降解有机污染物。涵盖石墨、碳纤维及气体扩散电极等阴极构型，记录 pH、溶解氧、Fe 盐投加量与阴极电位等变量。区分均相与异相电芬顿体系，便于评估羟基自由基贡献、铁泥副产物与能耗权衡。",
    descEn:
      "Fe²⁺/Fe³⁺-catalyzed in-situ H₂O₂ generation for antibiotics, dyes, and other recalcitrant organics. Records graphite, carbon fiber, and gas-diffusion cathodes together with pH, dissolved oxygen, iron dose, and cathode potential. Homogeneous and heterogeneous systems are tagged to compare ·OH contribution, iron sludge, and energy use.",
  },
  {
    abbr: "ER",
    titleZh: "电化学还原",
    titleEn: "Electrochemical Reduction",
    count: "7,734",
    descZh:
      "利用阴极还原实现卤代有机物脱卤、硝酸盐脱氮与重金属形态调控。收录 Cu、Sn、Pd 及复合催化阴极在不同 pH 与共存离子条件下的效能数据。关联电子转移数、副产物分布与电极稳定性，支撑还原路径机理解析与反应器选型。",
    descEn:
      "Cathodic dehalogenation, nitrate reduction, and metal speciation on Cu, Sn, Pd, and composite cathodes. Performance is indexed across pH and co-existing ions with electron-transfer stoichiometry, by-products, and electrode stability. Supports mechanistic interpretation and reactor selection for reductive treatment trains.",
  },
  {
    abbr: "EC",
    titleZh: "电絮凝",
    titleEn: "Electrocoagulation",
    count: "8,892",
    descZh:
      "通过铝、铁等牺牲性阳极溶解形成氢氧化物絮体，去除悬浮物、胶体与部分重金属离子。记录极板间距、电流密度、停留时间与水质参数对絮体粒径、Zeta 电位的影响。适用于预处理与物化联合工艺，可与膜分离、过滤等单元衔接评价整体去除效果。",
    descEn:
      "Sacrificial Al/Fe anodes generate hydroxide flocs for suspended solids, colloids, and partial metal removal. Plate spacing, current density, residence time, and water quality are linked to floc size and zeta potential. Suited to pretreatment and hybrid trains with membranes or filtration for overall performance assessment.",
  },
  {
    abbr: "CDI",
    titleZh: "电容去离子",
    titleEn: "Capacitive Deionization",
    count: "3,601",
    descZh:
      "利用多孔碳电极双电层吸附—脱附实现低能耗选择性脱盐，适用于苦咸水与工业低浓度离子废水。收录电极比电容、充电电压窗口、循环稳定性与再生效率等参数。可区分恒压/恒流模式及与电渗析、反渗透的耦合工况，支撑模块化除盐方案比选。",
    descEn:
      "Porous carbon electrodes adsorb and release ions via the electric double layer for low-energy desalination of brackish and dilute industrial streams. Specific capacitance, voltage window, cycle life, and regeneration efficiency are catalogued. Constant-voltage/current modes and hybrids with ED or RO enable modular deionization benchmarking.",
  },
  {
    abbr: "ED",
    titleZh: "电渗析",
    titleEn: "Electrodialysis",
    count: "5,104",
    descZh:
      "基于离子选择性膜的电场驱动分离，实现苦咸水淡化与工业废水浓缩回用。涵盖异质膜堆叠构型、浓缩倍率、电流效率与水回收率等运行指标。数据库关联膜电阻、极化电压与无机盐结垢风险，辅助淡化系统设计、能耗核算与运行维护策略制定。",
    descEn:
      "Ion-selective membranes under an electric field for brackish-water desalination and industrial concentrate recovery. Stack configuration, concentration factor, current efficiency, and water recovery are standardized. Membrane resistance, polarization, and scaling indicators support system design, energy accounting, and O&M planning.",
  },
];

const YEAR_DATA = [
  { year: "2018", count: 142 },
  { year: "2019", count: 198 },
  { year: "2020", count: 256 },
  { year: "2021", count: 312 },
  { year: "2022", count: 389 },
  { year: "2023", count: 478 },
  { year: "2024", count: 329 },
];

const PROCESS_DIST = [
  { label: "EO", pct: 36, color: "#4da3ff" },
  { label: "EF", pct: 22, color: "#64d2ff" },
  { label: "EC", pct: 18, color: "#c9a86c" },
  { label: "ER", pct: 14, color: "#a78bfa" },
  { labelZh: "其他", labelEn: "Other", label: "其他", pct: 10, color: "#6b7a92" },
];

const ELECTRODE_DIST = [
  { labelZh: "BDD", labelEn: "BDD", pct: 28 },
  { labelZh: "Ti/IrO₂", labelEn: "Ti/IrO₂", pct: 24 },
  { labelZh: "PbO₂", labelEn: "PbO₂", pct: 18 },
  { labelZh: "Ti/SnO₂", labelEn: "Ti/SnO₂", pct: 14 },
  { labelZh: "石墨", labelEn: "Graphite", pct: 10 },
  { labelZh: "其他", labelEn: "Other", pct: 6 },
];

const COUNTRY_TOP = [
  { labelZh: "中国", labelEn: "China", count: 4280 },
  { labelZh: "美国", labelEn: "United States", count: 1860 },
  { labelZh: "德国", labelEn: "Germany", count: 920 },
  { labelZh: "日本", labelEn: "Japan", count: 740 },
  { labelZh: "英国", labelEn: "United Kingdom", count: 610 },
  { labelZh: "法国", labelEn: "France", count: 480 },
  { labelZh: "韩国", labelEn: "South Korea", count: 390 },
  { labelZh: "其他", labelEn: "Other", count: 1567 },
];

const ENERGY_BUCKETS = [
  { labelZh: "0–5", labelEn: "0–5", pct: 14 },
  { labelZh: "5–15", labelEn: "5–15", pct: 28 },
  { labelZh: "15–30", labelEn: "15–30", pct: 32 },
  { labelZh: "30–50", labelEn: "30–50", pct: 18 },
  { labelZh: ">50", labelEn: ">50", pct: 8 },
];

function chartLabel(item) {
  return lang === "zh" ? item.labelZh || item.label : item.labelEn || item.label;
}

function pollutantBoxLabel(item) {
  return lang === "zh" ? item.nameZh || item.name : item.nameEn || item.name;
}

function recordPollutant(r) {
  return lang === "zh" ? r.pollutant : r.pollutantEn || r.pollutant;
}

function recordElectrodeLabel(r) {
  return lang === "zh" ? r.electrodeLabel : r.electrodeLabelEn || r.electrodeLabel;
}

const TEAM_LEAD = [
  { name: "王润之", photoBase: "王润之", initials: "WRZ", roleKey: "team.lead.r1", bioKey: "team.lead.b1" },
  { name: "赵雨萌 教授", photoBase: "赵雨萌", initials: "ZYM", roleKey: "team.lead.r2", bioKey: "team.lead.b2" },
  { name: "欧鹏飞 教授", photoBase: "欧鹏飞", initials: "OPF", roleKey: "team.lead.r3", bioKey: "team.lead.b3" },
  { name: "马军 院士", photoBase: "马军", initials: "MJ", roleKey: "team.lead.r4", bioKey: "team.lead.b4" },
];

const TEAM_UNITS = [
  { base: "单位1", ext: "jpg" },
  { base: "单位2", ext: "png" },
];

const TEAM_SUPPORT = [
  { name: "钟宝怡", photoBase: "钟宝怡", initials: "ZBY", roleKey: "team.support.r3" },
  { name: "赵梓棠", photoBase: "赵梓棠", initials: "ZZT", roleKey: "team.support.r2" },
  { name: "蔡正扬", photoBase: "蔡正扬", initials: "CZY", roleKey: "team.support.r4" },
  { name: "肖柯岩", photoBase: "肖柯岩", initials: "XKY", roleKey: "team.support.r5" },
  { name: "李金阔", photoBase: "李金阔", initials: "LJK", roleKey: "team.support.r1" },
  { name: "葛桓宇", photoBase: "葛桓宇", initials: "GHY", roleKey: "team.support.r6" },
  { name: "廖甜甜", photoBase: "廖甜甜", initials: "LTT", roleKey: "team.support.r7" },
];

let researchEntries = null;
let researchLoadPromise = null;

const RESEARCH_FALLBACK_ENTRIES = [
  {
    titleZh: "基于深度学习的反渗透膜污染层识别与预测",
    titleEn: "Deep Learning-Based Identification and Prediction of RO Fouling Layers",
    authorsZh: "Wang, L. 等",
    authorsEn: "Wang, L., et al.",
    venueZh: "Journal of Membrane Science",
    venueEn: "Journal of Membrane Science",
    year: "2023",
    typeZh: "研究论文",
    typeEn: "Research article",
    abstractZh:
      "构建卷积神经网络对膜表面污染类型进行自动分类，并结合通量衰减时序数据预测污染趋势，在公开 RO 运行数据集上准确率达 92%。",
    abstractEn:
      "A CNN classifies foulant layers on membrane surfaces and predicts fouling trends from flux-decline time series, reaching 92% accuracy on a public RO operations dataset.",
    tagsZh: ["深度学习", "反渗透", "膜污染"],
    tagsEn: ["Deep learning", "Reverse osmosis", "Membrane fouling"],
    link: "https://doi.org/10.1016/j.memsci.2023.05.018",
  },
  {
    titleZh: "纳滤膜分离性能的机器学习高通量筛选：综述",
    titleEn: "Machine Learning for High-Throughput Screening of Nanofiltration Performance: A Review",
    authorsZh: "Kumar, A. 等",
    authorsEn: "Kumar, A., et al.",
    venueZh: "Desalination",
    venueEn: "Desalination",
    year: "2024",
    typeZh: "综述",
    typeEn: "Review",
    abstractZh:
      "系统梳理描述符工程、迁移学习与可解释 AI 在纳滤膜材料—性能关联中的应用，总结公开数据库与基准任务，指出数据标准化与实验—计算闭环的关键挑战。",
    abstractEn:
      "Surveys descriptors, transfer learning, and explainable AI for NF materials–performance links, benchmarks public datasets, and highlights standardization and lab–computation closed loops.",
    tagsZh: ["机器学习", "纳滤", "综述"],
    tagsEn: ["Machine learning", "Nanofiltration", "Review"],
    link: "https://doi.org/10.1016/j.desal.2024.02.041",
  },
  {
    titleZh: "电渗析膜堆故障诊断的图神经网络方法",
    titleEn: "Graph Neural Networks for Fault Diagnosis in Electrodialysis Stacks",
    authorsZh: "Chen, H. 等",
    authorsEn: "Chen, H., et al.",
    venueZh: "Water Research",
    venueEn: "Water Research",
    year: "2022",
    typeZh: "研究论文",
    typeEn: "Research article",
    abstractZh:
      "将膜堆离子膜与流道抽象为图结构，利用 GNN 从电压—电流曲线中识别泄漏、浓差极化与结垢模式，实验验证 F1 达 0.89。",
    abstractEn:
      "Models membranes and channels as graphs; a GNN detects leakage, concentration polarization, and scaling from V–I curves with F1 = 0.89 in experiments.",
    tagsZh: ["图神经网络", "电渗析", "故障诊断"],
    tagsEn: ["Graph neural network", "Electrodialysis", "Fault diagnosis"],
    link: "https://doi.org/10.1016/j.watres.2022.09.055",
  },
  {
    titleZh: "超滤—反渗透耦合工艺的集成学习优化",
    titleEn: "Ensemble Learning Optimization of UF–RO Hybrid Processes",
    authorsZh: "Li, M. 等",
    authorsEn: "Li, M., et al.",
    venueZh: "Environmental Science & Technology",
    venueEn: "Environmental Science & Technology",
    year: "2023",
    typeZh: "研究论文",
    typeEn: "Research article",
    abstractZh:
      "融合随机森林与梯度提升预测产水通量、脱盐率与比能耗，在多目标约束下推荐操作窗口，相较经验规则节能约 14%。",
    abstractEn:
      "Random forests and gradient boosting predict flux, rejection, and specific energy; multi-objective recommendations cut energy use by ~14% versus rule-based operation.",
    tagsZh: ["集成学习", "超滤", "反渗透"],
    tagsEn: ["Ensemble learning", "Ultrafiltration", "Reverse osmosis"],
    link: "https://doi.org/10.1021/acs.est.3c04512",
  },
  {
    titleZh: "面向膜材料基因组的表示学习与性质预测",
    titleEn: "Representation Learning and Property Prediction for Membrane Materials Genomes",
    authorsZh: "Zhang, Y. 等",
    authorsEn: "Zhang, Y., et al.",
    venueZh: "npj Clean Water",
    venueEn: "npj Clean Water",
    year: "2024",
    typeZh: "研究论文",
    typeEn: "Research article",
    abstractZh:
      "采用 Transformer 编码聚合物重复单元序列，联合实验渗透性与选择性数据训练多任务模型，实现少样本条件下新膜配方性能外推。",
    abstractEn:
      "Transformer encoders for polymer repeat units coupled with permeability–selectivity data enable multi-task models and few-shot extrapolation for new membrane formulations.",
    tagsZh: ["表示学习", "膜材料", "性质预测"],
    tagsEn: ["Representation learning", "Membrane materials", "Property prediction"],
    link: "https://doi.org/10.1038/s41545-024-00281-6",
  },
  {
    titleZh: "膜分离领域机器学习应用进展与数据资源：高质量综述",
    titleEn: "Machine Learning in Membrane Separation: Progress and Data Resources",
    authorsZh: "ElectroWat DB 编委会",
    authorsEn: "ElectroWat DB Editorial Group",
    venueZh: "开放数据白皮书",
    venueEn: "Open Data White Paper",
    year: "2025",
    typeZh: "综述",
    typeEn: "Review",
    abstractZh:
      "汇总全球膜分离相关公开数据集、特征工程范式与深度学习案例，提供可下载的整理型数据包与引用规范，便于复现与二次分析。",
    abstractEn:
      "Compiles public membrane-separation datasets, feature-engineering workflows, and deep-learning case studies with a downloadable curated package and citation guidelines for reuse.",
    tagsZh: ["机器学习", "膜分离", "数据资源"],
    tagsEn: ["Machine learning", "Membrane separation", "Data resources"],
    link: "https://example.org/electrowat/membrane-ml-review-dataset.zip",
  },
];

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function parseResearchText(raw) {
  const entries = [];
  const blocks = raw.split(/\n---+\s*\n/).map((b) => b.trim()).filter(Boolean);
  for (let block of blocks) {
    block = block.replace(/^---+\s*\n?/, "").trim();
    if (!block || block.startsWith("#")) continue;
    const lines = block.split("\n");
    const fields = {};
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      if (!line.trim() || line.trim().startsWith("#")) {
        i++;
        continue;
      }
      const m = line.match(/^([a-z_]+):\s*(.*)$/i);
      if (!m) {
        i++;
        continue;
      }
      const key = m[1].toLowerCase();
      const val = m[2];
      if (val === "|") {
        i++;
        const buf = [];
        while (i < lines.length && !/^[a-z_]+:\s*/i.test(lines[i])) {
          buf.push(lines[i]);
          i++;
        }
        fields[key] = buf.join("\n").trim();
        continue;
      }
      fields[key] = val.trim();
      i++;
    }
    if (!fields.title && !fields.title_zh) continue;
    const tagsZh = (fields.tags || "").split(/[,，]/).map((t) => t.trim()).filter(Boolean);
    const tagsEn = (fields.tags_en || "").split(/[,，]/).map((t) => t.trim()).filter(Boolean);
    entries.push({
      titleZh: fields.title || fields.title_zh || "",
      titleEn: fields.title_en || fields.title || "",
      authorsZh: fields.authors || fields.authors_zh || "",
      authorsEn: fields.authors_en || fields.authors || "",
      venueZh: fields.venue || fields.venue_zh || "",
      venueEn: fields.venue_en || fields.venue || "",
      year: fields.year || "",
      typeZh: fields.type || "",
      typeEn: fields.type_en || fields.type || "",
      abstractZh: fields.abstract || "",
      abstractEn: fields.abstract_en || fields.abstract || "",
      tagsZh: tagsZh.length ? tagsZh : tagsEn,
      tagsEn: tagsEn.length ? tagsEn : tagsZh,
      link: fields.link || fields.url || fields.doi || "",
    });
  }
  return entries;
}

const POLLUTANT_BOX = [
  { nameZh: "PFAS", nameEn: "PFAS", q1: 72, med: 88, q3: 96 },
  { nameZh: "抗生素", nameEn: "Antibiotics", q1: 65, med: 82, q3: 94 },
  { nameZh: "染料", nameEn: "Dyes", q1: 78, med: 91, q3: 98 },
  { nameZh: "酚类", nameEn: "Phenolics", q1: 58, med: 75, q3: 89 },
  { nameZh: "重金属", nameEn: "Heavy metals", q1: 85, med: 96, q3: 99 },
];

const I18N = {
  zh: {
    "hero.eyebrow": "开放科学 · 环境电化学数据",
    "hero.title1": "电化学水处理全球数据平台",
    "hero.cover.alt": "ElectroWat DB 封面",
    "hero.lead1":
      "ElectroWat DB 面向全球环境电化学与水处理科学社区，系统整合电极材料、反应器构型、工艺参数及降解效能等多源数据与文献证据，构建了大规模、结构化、机器可读的开放数据库。依托AI驱动的知识挖掘框架，平台实现了文献数据的的自动抽取与标准化，将长期分散的科研信息转化为可分析、可建模的高价值数据资源，有效解决了领域数据碎片化与复用率低的关键瓶颈。",
    "hero.lead2":
      "作为面向 AI4Science 的专业数据基础设施，ElectroWat DB 可系统支持污染物降解动力学参数预测、电极与工艺协同优化、反应路径推理与与机制解析，以及研究趋势分析。通过提供严格标准化与质量控制的可计算数据集，我们不仅赋能机器学习驱动的科学发现，更致力于推动环境电化学领域从经验试错向数据驱动的科研范式转变，最终加速可持续水处理技术的创新与应用。",
    "hero.cta1": "检索数据集",
    "hero.cta2": "如何引用",
    "stat.records": "实验记录",
    "stat.pollutants": "目标污染物",
    "stat.papers": "关联文献",
    "stat.countries": "贡献国家/地区",
    "home.section.title": "数据库概览",
    "overview.desc": "每一条记录均关联原始文献 DOI、实验条件与质量平衡校验标记，支持跨工艺、跨电极体系的定量比较与机器学习特征工程。",
    "f1.title": "标准化元数据",
    "f1.desc": "涵盖污染物、浓度、电解质、pH、电流密度等 21 项核心字段，遵循 FAIR 数据原则。",
    "f2.title": "动力学参数库",
    "f2.desc": "收录表观速率常数、Tafel 斜率、传质系数与降解中间产物谱系。",
    "f3.title": "材料-性能映射",
    "f3.desc": "电极组成（BDD、PbO₂、Ti/IrO₂ 等）与污染物去除效率的结构化关联。",
    "f4.title": "开放 API",
    "f4.desc": "RESTful 与 GraphQL 接口，支持批量导出 JSON、XLSX 及 BibTeX 引用格式。",
    "explore.label": "数据检索",
    "explore.title": "多维检索与筛选",
    "filter.keyword": "关键词",
    "filter.ph": "污染物 / 电极 / DOI…",
    "filter.process": "工艺类型",
    "filter.electrode": "阳极材料",
    "filter.removal": "去除率 (%)",
    "filter.all": "全部",
    "filter.search": "检索",
    "results.found": "条匹配记录",
    "results.export": "导出 XLSX",
    "th.id": "ID",
    "th.pollutant": "污染物",
    "th.concentration": "浓度",
    "th.process": "工艺",
    "th.electrode": "电极",
    "th.removal": "去除率",
    "th.energy": "比能耗",
    "th.doi": "DOI",
    "domains.title": "覆盖电化学水处理六大核心方向",
    "analytics.label": "统计分析",
    "analytics.title": "数据库统计洞察",
    "chart1.title": "年度收录文献量",
    "chart2.title": "工艺类型分布",
    "chart3.title": "常见污染物去除率分布 (n=2,340)",
    "chart4.title": "阳极材料收录占比",
    "chart5.title": "数据贡献国家/地区",
    "chart6.title": "比能耗分布 (kWh·m⁻³)",
    "cite.label": "学术引用",
    "cite.title": "学术引用",
    "cite.desc": "使用本数据库发表研究成果时，请引用以下条目以支持开放科学生态。",
    "footer.tagline": "环境电化学开放数据倡议 · CC BY 4.0",
    "nav.home": "首页",
    "nav.explore": "数据检索",
    "nav.analytics": "统计分析",
    "nav.about": "关于我们",
    "nav.cite": "引用",
    "nav.research": "相关研究",
    "nav.enter": "进入数据库",
    "about.label": "关于我们",
    "about.title": "关于我们",
    "about.intro": "我们致力于构建开放、可信、可持续的电化学水处理数据生态，连接全球研究者与工程实践者。",
    "about.vision.title": "愿景",
    "about.vision.1": "让每一条实验数据可被检索、可被复现、可被引用",
    "about.vision.2": "使 ElectroWat DB 成为全球环境电化学水处理开放协作的知识枢纽",
    "about.vision.3": "打通基础研究、工程放大与智慧水务之间的知识链条",
    "about.vision.4": "以开放数据涵养互信协作的科研文化，惠及全球水环境守护者",
    "about.vision.5": "引领绿色、低碳、可持续水处理技术的长期变革",
    "theme.toLight": "浅色",
    "theme.toDark": "深色",
    "theme.ariaLight": "切换浅色主题",
    "theme.ariaDark": "切换深色主题",
    "about.mission.title": "使命",
    "about.mission.1": "建立覆盖氧化、还原、分离等全工艺链的标准化数据库",
    "about.mission.2": "推动 FAIR 原则在环境电化学领域的落地实践",
    "about.mission.3": "降低跨实验室数据比较与 meta 分析的门槛",
    "about.mission.4": "建设人机协同的文献挖掘、字段抽取与专家质控工作流",
    "about.mission.5": "为机器学习、过程优化与材料筛选提供高质量、可复现的特征数据集",
    "research.title": "相关研究",
    "research.intro":
      "在这个网页上，我们分享了一系列与电化学水处理相关的机器学习/深度学习文章和高质量综述。您可以使用每个条目下提供的链接访问这些文章/数据集。",
    "research.download": "DOI链接",
    "research.loading": "正在加载研究条目…",
    "research.empty": "未能读取研究数据。请编辑项目根目录的 research-data.js，保存后按 F5 刷新。",
    "about.team.title": "核心团队",
    "about.contact.title": "联系方式",
    "about.contact.email": "学术合作",
    "about.contact.email.val": "runzhiwang2021@163.com",
    "about.contact.data": "数据贡献",
    "about.contact.data.val": "electrowat@163.com",
    "about.contact.addr": "通讯地址",
    "about.contact.addr.val": "哈尔滨市南岗区150090，黑龙江省，中国",
    "team.lead.r1": "项目负责人",
    "team.lead.b1": "环境电化学与数据驱动研究",
    "team.lead.r2": "指导教师，领域专家",
    "team.lead.b2": "电化学水处理与智慧水务",
    "team.lead.r3": "指导教师，领域专家",
    "team.lead.b3": "计算电催化与人工智能",
    "team.lead.r4": "领衔顾问，行业专家",
    "team.lead.b4": "未来绿色低碳城乡水系统",
    "team.support.r1": "实验研究员",
    "team.support.r2": "数据挖掘师",
    "team.support.r3": "算法工程师",
    "team.support.r4": "文献检索师",
    "team.support.r5": "数据核验师",
    "team.support.r6": "数据采集员",
    "team.support.r7": "数据采集员",
  },
  en: {
    "hero.eyebrow": "Open Science · Environmental Electrochemistry Data",
    "hero.title1": "Global Electrochemical Water Treatment Data Platform",
    "hero.cover.alt": "ElectroWat DB cover",
    "hero.lead1":
      "ElectroWat DB serves the global environmental electrochemistry and water-treatment science community by systematically integrating multi-source data and literature evidence on electrode materials, reactor configurations, process parameters, and degradation performance into a large-scale, structured, machine-readable open database. Powered by an AI-driven knowledge-mining framework, the platform automates extraction and standardization of literature data, transforming long-scattered research information into high-value resources for analysis and modeling, and addressing critical bottlenecks of data fragmentation and low reusability in the field.",
    "hero.lead2":
      "As professional data infrastructure for AI4Science, ElectroWat DB systematically supports prediction of pollutant degradation kinetics, coordinated optimization of electrodes and processes, reaction-pathway inference and mechanistic interpretation, and research-trend analysis. By providing rigorously standardized, quality-controlled computational datasets, we empower machine-learning-driven scientific discovery and advance environmental electrochemistry from traditional trial-and-error toward data-driven research paradigms, ultimately accelerating innovation and application of sustainable water-treatment technologies.",
    "hero.cta1": "Explore Datasets",
    "hero.cta2": "How to Cite",
    "stat.records": "Experimental Records",
    "stat.pollutants": "Target Pollutants",
    "stat.papers": "Linked Publications",
    "stat.countries": "Contributing Regions",
    "home.section.title": "Database Overview",
    "overview.desc": "Each record links to source DOI, experimental conditions, and mass-balance validation flags for cross-process quantitative comparison and ML feature engineering.",
    "f1.title": "Standardized Metadata",
    "f1.desc": "21 core fields covering pollutant, concentration, electrolyte, pH, current density, and more — FAIR-compliant.",
    "f2.title": "Kinetics Repository",
    "f2.desc": "Apparent rate constants, Tafel slopes, mass-transfer coefficients, and degradation byproduct profiles.",
    "f3.title": "Material–Performance Mapping",
    "f3.desc": "Structured correlations between electrode composition (BDD, PbO₂, Ti/IrO₂) and removal efficiency.",
    "f4.title": "Open API",
    "f4.desc": "RESTful and GraphQL endpoints with JSON, XLSX, and BibTeX export.",
    "explore.label": "Data Explorer",
    "explore.title": "Multi-Dimensional Search & Filter",
    "filter.keyword": "Keywords",
    "filter.ph": "Pollutant / Electrode / DOI…",
    "filter.process": "Process Type",
    "filter.electrode": "Anode Material",
    "filter.removal": "Removal (%)",
    "filter.all": "All",
    "filter.search": "Search",
    "results.found": "matching records",
    "results.export": "Export XLSX",
    "th.id": "ID",
    "th.pollutant": "Pollutant",
    "th.concentration": "Concentration",
    "th.process": "Process",
    "th.electrode": "Electrode",
    "th.removal": "Removal",
    "th.energy": "SEC",
    "th.doi": "DOI",
    "domains.title": "Six Core Electrochemical Water Treatment Areas",
    "analytics.label": "Analytics",
    "analytics.title": "Database Statistics",
    "chart1.title": "Publications Indexed by Year",
    "chart2.title": "Process Type Distribution",
    "chart3.title": "Removal Efficiency Distribution (n=2,340)",
    "chart4.title": "Anode Material Share in Records",
    "chart5.title": "Contributing Countries/Regions",
    "chart6.title": "Specific Energy Distribution (kWh·m⁻³)",
    "cite.label": "Citation",
    "cite.title": "Academic Citation",
    "cite.desc": "Please cite the following when publishing research using this database.",
    "footer.tagline": "Open Electrochemical Environmental Data · CC BY 4.0",
    "nav.home": "Home",
    "nav.explore": "Explore",
    "nav.analytics": "Analytics",
    "nav.about": "About",
    "nav.cite": "Citation",
    "nav.research": "Related Research",
    "nav.enter": "Enter Database",
    "about.label": "About Us",
    "about.title": "About Us",
    "about.intro": "We build an open, trustworthy, and sustainable data ecosystem for electrochemical water treatment.",
    "about.vision.title": "Vision",
    "about.vision.1": "Every experimental record should be discoverable, reproducible, and citable",
    "about.vision.2": "Position ElectroWat DB as a global open hub for electrochemical water-treatment knowledge",
    "about.vision.3": "Connect fundamental research, scale-up engineering, and smart water practice",
    "about.vision.4": "Foster a culture of open, trustworthy collaboration for water-environment stewards worldwide",
    "about.vision.5": "Lead the long-term transition toward green, low-carbon, sustainable water treatment",
    "theme.toLight": "Light",
    "theme.toDark": "Dark",
    "theme.ariaLight": "Switch to light theme",
    "theme.ariaDark": "Switch to dark theme",
    "about.mission.title": "Mission",
    "about.mission.1": "Standardize data across oxidation, reduction, and separation processes",
    "about.mission.2": "Advance FAIR principles in environmental electrochemistry",
    "about.mission.3": "Lower barriers to cross-lab comparison and meta-analysis",
    "about.mission.4": "Operate human-in-the-loop literature mining, extraction, and expert QA workflows",
    "about.mission.5": "Deliver high-quality, reproducible feature sets for ML, process optimization, and materials screening",
    "research.title": "Related Research",
    "research.intro":
      "On this page we share machine-learning and deep-learning articles related to electrochemical water treatment, along with high-quality reviews. Use the link under each entry to download the associated datasets.",
    "research.download": "Download dataset",
    "research.loading": "Loading research entries…",
    "research.empty": "Could not load research data. Edit research-data.js in the project root, save, and press F5.",
    "about.team.title": "Core Team",
    "about.contact.title": "Contact",
    "about.contact.email": "Research Collaboration",
    "about.contact.email.val": "runzhiwang2021@163.com",
    "about.contact.data": "Data Contribution",
    "about.contact.data.val": "electrowat@163.com",
    "about.contact.addr": "Mailing Address",
    "about.contact.addr.val": "Nangang District, Harbin 150090, Heilongjiang, China",
    "team.lead.r1": "Principal Investigator",
    "team.lead.b1": "Environmental electrochemistry & data-driven research",
    "team.lead.r2": "Supervising Instructor, Domain Expert",
    "team.lead.b2": "Electrochemical water treatment & smart water",
    "team.lead.r3": "Supervising Instructor, Domain Expert",
    "team.lead.b3": "Computational electrocatalysis & AI",
    "team.lead.r4": "Special Advisor",
    "team.lead.b4": "Future green low-carbon urban-rural water systems",
    "team.support.r1": "Research Specialist",
    "team.support.r2": "Data Architect",
    "team.support.r3": "Algorithm Engineer",
    "team.support.r4": "Data Verification",
    "team.support.r5": "Data Verification",
    "team.support.r6": "Data Collection",
    "team.support.r7": "Data Collection",
  },
};

let lang = "zh";
let theme = "dark";

function getThemeColor(varName) {
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
}

const THEME_ICON_SUN =
  '<svg class="btn-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
const THEME_ICON_MOON =
  '<svg class="btn-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

function updateThemeToggle() {
  const btn = document.getElementById("theme-toggle");
  const dict = I18N[lang];
  if (!btn) return;
  if (theme === "dark") {
    btn.innerHTML = THEME_ICON_SUN;
    btn.setAttribute("aria-label", dict["theme.ariaLight"] || "切换浅色主题");
    btn.setAttribute("title", dict["theme.toLight"] || "浅色");
  } else {
    btn.innerHTML = THEME_ICON_MOON;
    btn.setAttribute("aria-label", dict["theme.ariaDark"] || "切换深色主题");
    btn.setAttribute("title", dict["theme.toDark"] || "深色");
  }
}

function setTheme(next) {
  theme = next === "light" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("ew-theme", theme);
  } catch {
    /* private browsing */
  }
  updateThemeToggle();

  const canvas = document.getElementById("field-canvas");
  if (canvas) canvas.style.opacity = getThemeColor("--canvas-opacity") || "";

  if (document.getElementById("chart-process")) initCharts();
}

function initTheme() {
  let stored = null;
  try {
    stored = localStorage.getItem("ew-theme");
  } catch {
    stored = null;
  }
  if (stored !== "light" && stored !== "dark") {
    theme = "dark";
    try {
      localStorage.setItem("ew-theme", "dark");
    } catch {
      /* ignore */
    }
  } else {
    theme = stored;
  }
  document.documentElement.setAttribute("data-theme", theme);
  updateThemeToggle();

  document.getElementById("theme-toggle")?.addEventListener("click", () => {
    setTheme(theme === "dark" ? "light" : "dark");
  });
}

let currentView = "home";

function updateDocumentTitle() {
  if (currentView === "research") {
    document.title =
      lang === "zh"
        ? "相关研究 | ElectroWat DB"
        : "Related Research | ElectroWat DB";
    return;
  }
  document.title =
    lang === "zh"
      ? "ElectroWat DB | 电化学水处理数据库"
      : "ElectroWat DB | Electrochemical Water Treatment Database";
}

function domainTitle(d) {
  const name = lang === "zh" ? d.titleZh : d.titleEn;
  return lang === "zh" ? `${name}（${d.abbr}）` : `${name} (${d.abbr})`;
}

function setNavActive(target) {
  document.querySelectorAll(".main-nav .nav-link").forEach((link) => {
    const view = link.dataset.view;
    if (view === "research") {
      link.classList.toggle("is-active", target === "research");
      return;
    }
    const href = link.getAttribute("href")?.slice(1) || "";
    const active =
      target !== "research" &&
      (href === target || (target === "top" && (href === "top" || href === "")));
    link.classList.toggle("is-active", active);
  });
}

function isReloadNavigation() {
  const entry = performance.getEntriesByType("navigation")[0];
  return entry?.type === "reload";
}

function scrollToSection(id) {
  if (currentView !== "home") return;
  if (!id || id === "top") {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = "";
    return;
  }
  const home = document.getElementById("view-home");
  const el = home?.querySelector(`#${CSS.escape(id)}`) || document.getElementById(id);
  if (el && home?.contains(el)) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function setViewElVisibility(el, visible) {
  if (!el) return;
  el.hidden = !visible;
  el.classList.toggle("is-hidden", !visible);
  el.setAttribute("aria-hidden", visible ? "false" : "true");
}

function showView(view, sectionId) {
  const home = document.getElementById("view-home");
  const research = document.getElementById("view-research");
  if (!home || !research) return;

  currentView = view;
  if (view === "research") {
    setViewElVisibility(home, false);
    setViewElVisibility(research, true);
    document.body.classList.add("is-research-view");
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = "";
    setNavActive("research");
    updateDocumentTitle();
    loadResearchFromFile();
    return;
  }

  setViewElVisibility(home, true);
  setViewElVisibility(research, false);
  document.body.classList.remove("is-research-view");
  const target = sectionId || "top";
  setNavActive(target);
  updateDocumentTitle();
  if (target === "top") {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  } else {
    requestAnimationFrame(() => scrollToSection(target));
  }
}

function isResearchHash(hash) {
  return hash === "related-research" || hash === "research";
}

function handleRoute() {
  let hash = (location.hash || "#top").slice(1);
  if (hash === "research") {
    hash = "related-research";
    history.replaceState(null, "", "#related-research");
  }
  if (isResearchHash(hash)) showView("research");
  else {
    let section = hash || "top";
    if (isReloadNavigation()) {
      section = "top";
      if (hash && hash !== "top") history.replaceState(null, "", "#top");
    }
    showView("home", section);
  }
}

function initAppRouter() {
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  window.addEventListener("pageshow", () => {
    if (isResearchHash((location.hash || "").slice(1))) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  });

  document.querySelector(".brand")?.addEventListener("click", (e) => {
    e.preventDefault();
    location.hash = "top";
    handleRoute();
  });

  document.querySelectorAll(".main-nav .nav-link, .footer-nav a").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href?.startsWith("#")) return;
      e.preventDefault();
      location.hash = href.slice(1) || "top";
      handleRoute();
    });
  });

  document.querySelector('.header-actions a[href="#explore"]')?.addEventListener("click", (e) => {
    e.preventDefault();
    location.hash = "explore";
    handleRoute();
  });

  window.addEventListener("hashchange", handleRoute);
  handleRoute();
}

function initNavHighlight() {
  const home = document.getElementById("view-home");
  const sections = ["top", "explore", "analytics", "about", "cite"]
    .map((id) => home?.querySelector(`#${id}`))
    .filter(Boolean);

  const onScroll = () => {
    if (currentView !== "home") return;
    let current = "top";
    const offset = 140;
    sections.forEach((sec) => {
      if (sec.getBoundingClientRect().top <= offset) current = sec.id;
    });
    setNavActive(current);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function researchCardHtml(p, dict) {
  const title = escapeHtml(lang === "zh" ? p.titleZh : p.titleEn);
  const authors = escapeHtml(lang === "zh" ? p.authorsZh : p.authorsEn);
  const venue = escapeHtml(lang === "zh" ? p.venueZh : p.venueEn);
  const abstract = escapeHtml(lang === "zh" ? p.abstractZh : p.abstractEn);
  const typeLabel = escapeHtml(lang === "zh" ? p.typeZh : p.typeEn);
  const tags = (lang === "zh" ? p.tagsZh : p.tagsEn) || [];
  const link = escapeHtml(p.link);
  const year = escapeHtml(p.year);
  const typeBadge = typeLabel ? `<span class="research-type">${typeLabel}</span>` : "";
  const download = p.link
    ? `<a class="btn btn-ghost btn-sm research-doi" href="${link}" target="_blank" rel="noopener noreferrer">${escapeHtml(dict["research.download"])}</a>`
    : "";
  return `
    <article class="research-card">
      <div class="research-card-head">
        <h3 class="research-card-title">${title}</h3>
        <p class="research-card-meta">${authors} · <em>${venue}</em>${year ? ` · ${year}` : ""} ${typeBadge}</p>
      </div>
      <p class="research-card-abstract">${abstract}</p>
      <div class="research-card-foot">
        <ul class="research-tags">${tags.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}</ul>
        ${download}
      </div>
    </article>`;
}

function renderResearchLoading() {
  const list = document.getElementById("research-list");
  if (!list) return;
  list.classList.add("is-loading");
  list.innerHTML = Array.from({ length: 4 }, () => '<article class="research-card research-card--skeleton" aria-hidden="true"></article>').join(
    ""
  );
}

function researchFromEmbeddedScript() {
  const raw = typeof window.RESEARCH_SOURCE === "string" ? window.RESEARCH_SOURCE.trim() : "";
  if (!raw) return [];
  return parseResearchText(raw);
}

async function resolveResearchEntries() {
  const embedded = researchFromEmbeddedScript();
  if (embedded.length) return embedded;
  return RESEARCH_FALLBACK_ENTRIES.map((e) => ({ ...e }));
}

async function loadResearchFromFile(force = false) {
  const list = document.getElementById("research-list");
  if (!list) return;
  if (!force && researchEntries?.length) {
    renderResearch();
    return;
  }
  if (!researchLoadPromise) {
    renderResearchLoading();
    researchLoadPromise = resolveResearchEntries()
      .then((entries) => {
        researchEntries = entries;
      })
      .catch(() => {
        researchEntries = RESEARCH_FALLBACK_ENTRIES.map((e) => ({ ...e }));
      })
      .finally(() => {
        researchLoadPromise = null;
        renderResearch();
      });
  } else {
    await researchLoadPromise;
    renderResearch();
  }
}

function renderResearch() {
  const list = document.getElementById("research-list");
  if (!list) return;
  list.classList.remove("is-loading");
  const dict = I18N[lang];
  const items = researchEntries ?? [];
  if (!items.length) {
    list.innerHTML = `<p class="research-empty">${escapeHtml(dict["research.empty"] || "")}</p>`;
    return;
  }
  list.innerHTML = items.map((p) => researchCardHtml(p, dict)).join("");
}

function initCanvas() {
  const canvas = document.getElementById("field-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w, h, particles;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    particles = Array.from({ length: Math.min(60, Math.floor(w * h / 22000)) }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.2 + 0.4,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const accent =
      document.documentElement.getAttribute("data-theme") === "light"
        ? "45, 90, 140"
        : "77, 163, 255";

    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
    
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${accent}, 0.2)`;
      ctx.fill();
    
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dist = Math.hypot(p.x - q.x, p.y - q.y);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(${accent}, ${0.06 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });
    requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener("resize", resize);
}

function initHeroStatsCanvas() {
  const block = document.querySelector(".hero-stats-block");
  const canvas = document.getElementById("hero-stats-canvas");
  if (!block || !canvas) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ctx = canvas.getContext("2d");
  let w = 0;
  let h = 0;
  let particles = [];
  let rafId = 0;
  let tick = 0;

  const accentRgb = () =>
    document.documentElement.getAttribute("data-theme") === "light" ? "45, 90, 140" : "77, 163, 255";

  function spawnParticles() {
    const count = Math.min(48, Math.max(28, Math.floor((w * h) / 5200)));
    particles = Array.from({ length: count }, () => {
      const speed = reduceMotion ? 0.08 : 0.25 + Math.random() * 0.35;
      const angle = Math.random() * Math.PI * 2;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        baseR: 1.6 + Math.random() * 2.2,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.035 + Math.random() * 0.03,
        phase: Math.random() * Math.PI * 2,
        driftAmp: 0.35 + Math.random() * 0.55,
      };
    });
  }

  function resize() {
    const rect = block.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = Math.max(1, Math.floor(rect.width));
    h = Math.max(1, Math.floor(rect.height));
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    spawnParticles();
  }

  function bounceParticle(p) {
    const pad = p.baseR + 2;
    if (p.x < pad) {
      p.x = pad;
      p.vx = Math.abs(p.vx) * 0.92;
    } else if (p.x > w - pad) {
      p.x = w - pad;
      p.vx = -Math.abs(p.vx) * 0.92;
    }
    if (p.y < pad) {
      p.y = pad;
      p.vy = Math.abs(p.vy) * 0.92;
    } else if (p.y > h - pad) {
      p.y = h - pad;
      p.vy = -Math.abs(p.vy) * 0.92;
    }
    const minSpeed = reduceMotion ? 0.05 : 0.18;
    const sp = Math.hypot(p.vx, p.vy) || minSpeed;
    if (sp < minSpeed) {
      const scale = minSpeed / sp;
      p.vx *= scale;
      p.vy *= scale;
    }
  }

  function drawParticle(p, accent) {
    const pulse = Math.sin(p.pulse);
    const r = p.baseR * (1 + 0.28 * pulse);
    const coreAlpha = reduceMotion ? 0.42 : 0.52 + pulse * 0.18;

    const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3.2);
    glow.addColorStop(0, `rgba(${accent}, ${coreAlpha * 0.55})`);
    glow.addColorStop(0.45, `rgba(${accent}, ${coreAlpha * 0.2})`);
    glow.addColorStop(1, `rgba(${accent}, 0)`);
    ctx.beginPath();
    ctx.arc(p.x, p.y, r * 3.2, 0, Math.PI * 2);
    ctx.fillStyle = glow;
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${accent}, ${coreAlpha})`;
    ctx.fill();
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const accent = accentRgb();
    const linkDist = Math.min(150, Math.max(95, w * 0.2));
    tick += 1;
    const t = tick * 0.016;

    particles.forEach((p, i) => {
      if (!reduceMotion) {
        p.x += p.vx + Math.sin(t * 1.1 + p.phase) * p.driftAmp * 0.08;
        p.y += p.vy + Math.cos(t * 0.95 + p.phase) * p.driftAmp * 0.08;
        p.pulse += p.pulseSpeed;
        bounceParticle(p);
      } else {
        p.pulse += 0.01;
      }
    
      drawParticle(p, accent);
    
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dist = Math.hypot(p.x - q.x, p.y - q.y);
        if (dist < linkDist) {
          const lineA = (reduceMotion ? 0.12 : 0.22) * (1 - dist / linkDist);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(${accent}, ${lineA})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }
    });
    
    rafId = requestAnimationFrame(draw);
  }

  const ro = new ResizeObserver(() => resize());
  ro.observe(block);
  requestAnimationFrame(() => {
    resize();
    draw();
  });

  window.addEventListener("beforeunload", () => {
    cancelAnimationFrame(rafId);
    ro.disconnect();
  });
}

function renderTable(rows) {
  const tbody = document.getElementById("table-body");
  const countEl = document.getElementById("result-count");
  if (!tbody) return;

  countEl.textContent = rows.length;
  tbody.innerHTML = rows
    .map(
      (r) => `
    <tr>
      <td class="id">${r.id}</td>
      <td class="pollutant">${escapeHtml(recordPollutant(r))}</td>
      <td>${r.concentration}</td>
      <td>${r.processLabel}</td>
      <td>${escapeHtml(recordElectrodeLabel(r))}</td>
      <td class="${r.removal >= 90 ? "removal-high" : ""}">${r.removal.toFixed(1)}%</td>
      <td>${r.energy}</td>
      <td><a href="https://doi.org/${r.doi}" target="_blank" rel="noopener">${r.doi.slice(0, 18)}…</a></td>
    </tr>`
    )
    .join("");
}

function filterRecords() {
  const q = (document.getElementById("q")?.value || "").toLowerCase();
  const process = document.getElementById("process")?.value || "";
  const electrode = document.getElementById("electrode")?.value || "";
  const removalMin = Number(document.getElementById("removal-min")?.value ?? 0);
  const removalMax = Number(document.getElementById("removal-max")?.value ?? 100);

  return RECORDS.filter((r) => {
    if (process && r.process !== process) return false;
    if (electrode && r.electrode !== electrode) return false;
    if (r.removal < removalMin || r.removal > removalMax) return false;
    if (q) {
      const hay = `${r.id} ${r.pollutant} ${r.pollutantEn || ""} ${r.concentration} ${r.processLabel} ${r.electrodeLabel} ${r.electrodeLabelEn || ""} ${r.doi}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

function exportXlsx(rows) {
  if (typeof XLSX === "undefined") {
    alert(lang === "zh" ? "导出组件加载失败，请刷新页面后重试。" : "Export library failed to load. Please refresh and try again.");
    return;
  }

  const header =
    lang === "zh"
      ? ["ID", "污染物", "浓度", "工艺", "电极", "去除率 (%)", "比能耗", "DOI"]
      : ["ID", "Pollutant", "Concentration", "Process", "Electrode", "Removal (%)", "SEC", "DOI"];

  const body = rows.map((r) => [
    r.id,
    recordPollutant(r),
    r.concentration,
    r.processLabel,
    recordElectrodeLabel(r),
    r.removal,
    r.energy,
    r.doi,
  ]);

  const ws = XLSX.utils.aoa_to_sheet([header, ...body]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Records");
  XLSX.writeFile(wb, "electrowat_export.xlsx");
}

function initRemovalRange() {
  const minEl = document.getElementById("removal-min");
  const maxEl = document.getElementById("removal-max");
  const out = document.getElementById("removal-range-val");
  if (!minEl || !maxEl || !out) return;

  const sync = () => {
    let min = Number(minEl.value);
    let max = Number(maxEl.value);
    if (min > max) {
      if (document.activeElement === minEl) maxEl.value = String(min);
      else minEl.value = String(max);
      min = Number(minEl.value);
      max = Number(maxEl.value);
    }
    out.textContent = lang === "zh" ? `${min} – ${max}` : `${min} – ${max}`;
  };

  minEl.addEventListener("input", sync);
  maxEl.addEventListener("input", sync);
  sync();
}

function initExplorer() {
  const form = document.getElementById("filter-form");
  initRemovalRange();

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    renderTable(filterRecords());
  });

  document.getElementById("export-btn")?.addEventListener("click", () => {
    exportXlsx(filterRecords());
  });

  renderTable(RECORDS);
}

function heroCoverSrc(base, ext) {
  return `assets/${base}.${ext}`;
}

function heroCoverFallback(img) {
  const base = img.dataset.coverBase || "封面图片";
  if (!img.dataset.tryJpg) {
    img.dataset.tryJpg = "1";
    img.src = heroCoverSrc(base, "jpg");
    return;
  }
  img.style.display = "none";
}

function teamPhotoSrc(base, ext) {
  return `assets/${base}.${ext}`;
}

function teamPhotoFallback(img) {
  const wrap = img.parentElement;
  const base = img.dataset.photoBase;
  if (!base || !wrap) return;
  if (!img.dataset.tryPng) {
    img.dataset.tryPng = "1";
    img.src = teamPhotoSrc(base, "png");
    return;
  }
  wrap.classList.add("is-fallback");
}

function unitLogoSrc(base, ext) {
  return `assets/${base}.${ext}`;
}

function unitLogoFallback(img) {
  const base = img.dataset.unitBase;
  if (!base) return;
  if (!img.dataset.tryPng) {
    img.dataset.tryPng = "1";
    img.src = unitLogoSrc(base, "png");
    return;
  }
  if (!img.dataset.tryJpg) {
    img.dataset.tryJpg = "1";
    img.src = unitLogoSrc(base, "jpg");
    return;
  }
  img.hidden = true;
}

function unitLogoHtml(unit) {
  const base = typeof unit === "string" ? unit : unit.base;
  const ext = typeof unit === "string" ? "jpg" : unit.ext;
  return `
    <div class="team-unit-item">
      <img
        class="team-unit-logo"
        src="${unitLogoSrc(base, ext)}"
        alt="${base}"
        loading="lazy"
        decoding="async"
        data-unit-base="${base}"
        onerror="unitLogoFallback(this)"
      />
    </div>`;
}

function renderTeamUnits() {
  const el = document.getElementById("team-units");
  if (!el) return;
  el.innerHTML = TEAM_UNITS.map(unitLogoHtml).join("");
}

function teamPhotoHtml(m, compact) {
  const base = m.photoBase || m.name.replace(/\s*(教授|院士)\s*/g, "").trim();
  return `
    <div class="team-photo-wrap${compact ? " team-photo-wrap--compact" : ""}">
      <img
        class="team-photo-img"
        src="${teamPhotoSrc(base, "jpg")}"
        alt="${m.name}"
        loading="lazy"
        decoding="async"
        data-photo-base="${base}"
        onerror="teamPhotoFallback(this)"
      />
      <div class="team-avatar team-avatar-fallback" aria-hidden="true">${m.initials}</div>
    </div>`;
}

function teamCardHtml(m, dict, compact) {
  const bio = m.bioKey && dict[m.bioKey] ? `<p class="bio">${dict[m.bioKey]}</p>` : "";
  return `
    <article class="team-card${compact ? " team-card--compact" : ""}">
      ${teamPhotoHtml(m, compact)}
      <h4>${m.name}</h4>
      <p class="role">${dict[m.roleKey] || ""}</p>
      ${bio}
    </article>`;
}

function renderTeam() {
  const leadEl = document.getElementById("team-lead");
  const supportEl = document.getElementById("team-support");
  if (!leadEl || !supportEl) return;
  const dict = I18N[lang];
  leadEl.innerHTML = TEAM_LEAD.map((m) => teamCardHtml(m, dict, false)).join("");
  supportEl.innerHTML = TEAM_SUPPORT.map((m) => teamCardHtml(m, dict, true)).join("");
  renderTeamUnits();
}

function initDomains() {
  const grid = document.getElementById("domain-grid");
  if (!grid) return;
  grid.innerHTML = DOMAINS.map(
    (d) => `
    <article class="domain-card">
      <div class="count">${d.count}</div>
      <h3>${domainTitle(d)}</h3>
      <p>${lang === "zh" ? d.descZh : d.descEn}</p>
    </article>`
  ).join("");
}

function initCharts() {
  const barEl = document.getElementById("chart-years");
  if (barEl) {
    const max = Math.max(...YEAR_DATA.map((d) => d.count));
    barEl.innerHTML = YEAR_DATA.map(
      (d) => `
      <div class="bar-group">
        <div class="bar" style="height: ${(d.count / max) * 100}%"></div>
        <span>${d.year}</span>
      </div>`
    ).join("");
  }

  const svg = document.getElementById("chart-process");
  const legend = document.getElementById("process-legend");
  if (svg && legend) {
    const cx = 60, cy = 60, r = 42;
    let offset = 0;
    const arcs = PROCESS_DIST.map((p) => {
      const start = offset;
      offset += (p.pct / 100) * Math.PI * 2;
      return { ...p, start, end: offset };
    });

    svg.innerHTML =
      arcs
        .map((a) => {
          const x1 = cx + r * Math.cos(a.start - Math.PI / 2);
          const y1 = cy + r * Math.sin(a.start - Math.PI / 2);
          const x2 = cx + r * Math.cos(a.end - Math.PI / 2);
          const y2 = cy + r * Math.sin(a.end - Math.PI / 2);
          const large = a.end - a.start > Math.PI ? 1 : 0;
          return `<path d="M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z" fill="${a.color}" opacity="0.9"/>`;
        })
        .join("") + `<circle cx="${cx}" cy="${cy}" r="26" fill="${getThemeColor("--bg-panel") || "#0e1420"}"/>`;
    
    legend.innerHTML = PROCESS_DIST.map(
      (p) =>
        `<li><span class="swatch" style="background:${p.color}"></span>${chartLabel(p)} <strong>${p.pct}%</strong></li>`
    ).join("");
  }

  const strip = document.getElementById("chart-pollutants");
  if (strip) {
    strip.innerHTML = POLLUTANT_BOX.map(
      (p) => `
      <div class="box-row">
        <label>${pollutantBoxLabel(p)}</label>
        <div class="box-track">
          <div class="box-range" style="left:${p.q1}%; width:${p.q3 - p.q1}%"></div>
          <div class="box-median" style="left:${p.med}%"></div>
        </div>
        <span class="pct">${p.med}%</span>
      </div>`
    ).join("");
  }

  const electrodeEl = document.getElementById("chart-electrodes");
  if (electrodeEl) {
    const maxE = Math.max(...ELECTRODE_DIST.map((d) => d.pct));
    electrodeEl.innerHTML = ELECTRODE_DIST.map(
      (d) => `
      <div class="hbar-row">
        <span class="hbar-label">${chartLabel(d)}</span>
        <div class="hbar-track"><span class="hbar-fill" style="width:${(d.pct / maxE) * 100}%"></span></div>
        <span class="hbar-val">${d.pct}%</span>
      </div>`
    ).join("");
  }

  const countryEl = document.getElementById("chart-countries");
  if (countryEl) {
    const maxC = Math.max(...COUNTRY_TOP.map((d) => d.count));
    countryEl.innerHTML = COUNTRY_TOP.map(
      (d) => `
      <div class="bar-group bar-group--country">
        <div class="bar" style="height: ${(d.count / maxC) * 100}%"></div>
        <span>${chartLabel(d)}</span>
      </div>`
    ).join("");
  }

  const energyEl = document.getElementById("chart-energy");
  if (energyEl) {
    const maxB = Math.max(...ENERGY_BUCKETS.map((d) => d.pct));
    energyEl.innerHTML = ENERGY_BUCKETS.map(
      (d) => `
      <div class="bar-group">
        <div class="bar bar--muted" style="height: ${(d.pct / maxB) * 100}%"></div>
        <span>${chartLabel(d)}</span>
      </div>`
    ).join("");
  }

}

function setLang(next) {
  lang = next === "en" ? "en" : "zh";
  try {
    localStorage.setItem("ew-lang", lang);
  } catch {
    /* private browsing */
  }
  const dict = I18N[lang];
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
    const key = el.getAttribute("data-i18n-alt");
    if (dict[key]) el.alt = dict[key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key]) el.placeholder = dict[key];
  });
  document.getElementById("lang-toggle").textContent = lang === "zh" ? "EN" : "中文";
  renderTeam();
  renderResearch();
  initDomains();
  initCharts();
  if (document.getElementById("table-body")) renderTable(filterRecords());
  initRemovalRange();
  updateThemeToggle();
  updateDocumentTitle();
}

function initI18n() {
  let storedLang = null;
  try {
    storedLang = localStorage.getItem("ew-lang");
  } catch {
    storedLang = null;
  }
  lang = storedLang === "en" ? "en" : "zh";
  document.getElementById("lang-toggle")?.addEventListener("click", () => {
    setLang(lang === "zh" ? "en" : "zh");
  });
  setLang(lang);
}

function markAppReady() {
  document.documentElement.classList.add("ew-ready");
}

document.addEventListener("DOMContentLoaded", () => {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  initTheme();
  initI18n();
  initAppRouter();
  initCanvas();
  initHeroStatsCanvas();
  initExplorer();
  loadResearchFromFile();
  initNavHighlight();
  markAppReady();
});
