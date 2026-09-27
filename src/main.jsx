import React, {useState} from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight, CheckCircle2, ChevronDown, FileText, HeartHandshake,
  Info, Landmark, Menu, MessageCircle, ShieldCheck, Sparkles, X
} from "lucide-react";
import logo from "../assets/img/Logo.png";
import "./styles.css";

const siteConfig = {
  foundationName: "YAYASAN JAMIATUL ULUM AL FATAH",
  programName: "Program Lelang Donasi Pembangunan Pondok Pesantren",
  tagline: "Bersama Membangun Generasi Qur'ani, Menanam Amal Jariyah Sepanjang Masa",
  targetAmount: 250000000,
  whatsapp: "6281375157301",
  whatsappDisplay: "081375157301",
  email: "jamiatululumalfatah@gmail.com",
  address: "Perumahan Taman Seruni Indah Blok D No. 01, Teluk Tering, Batam Kota, Batam, Kepulauan Riau"
};

// V1: belum ada backend. Nilai 0 sengaja dipertahankan agar tidak memberi kesan
// seolah-olah ada dana/donatur aktual yang sudah tercatat.
const programProgress = {
  target: siteConfig.targetAmount,
  collected: 0,
  donors: 0
};

const fundAllocation = [
  ["Persiapan pembangunan pondok (termasuk penyediaan akses jalan)", 220000000],
  ["Pengukuran, pematokan, dan administrasi lahan", 5000000],
  ["Notaris, legalitas, dan biaya pendukung", 10000000],
  ["Pembersihan lahan dan persiapan lokasi pembangunan", 8000000],
  ["Dokumentasi, publikasi, dan laporan kepada donatur", 2000000],
  ["Dana operasional pelaksanaan Tahap I", 5000000]
];

const categories = [
  {name: "Donatur Utama", amount: 10000000, donors: 10},
  {name: "Donatur Pendukung", amount: 5000000, donors: 20},
  {name: "Donatur Partisipasi", amount: 1000000, donors: 50}
];

const facilities = [
  "Masjid", "Asrama Santri Putra", "Asrama Santri Putri", "Gedung Kelas",
  "Rumah Asatidz", "Aula Serbaguna", "Perpustakaan Islam", "Dapur Umum",
  "Kantor Yayasan", "Sarana Pendukung"
];

const stages = [
  ["Tahap I", "Persiapan Kawasan Pembangunan", "Target Rp250.000.000"],
  ["Tahap II", "Pembangunan Masjid", "Tahapan lanjutan"],
  ["Tahap III", "Pembangunan Asrama Santri", "Tahapan lanjutan"],
  ["Tahap IV", "Pembangunan Gedung Pendidikan", "Tahapan lanjutan"],
  ["Tahap V", "Penyempurnaan Kawasan Pondok Pesantren", "Tahapan lanjutan"]
];

function rupiah(n) {
  return new Intl.NumberFormat("id-ID", {style:"currency", currency:"IDR", maximumFractionDigits:0}).format(n);
}

function waUrl(text) {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
}

function donationMessage(category, amount) {
  const amountText = amount ? rupiah(amount) : "sesuai kemampuan";
  const role = category ? ` sebagai ${category}` : "";
  return `Assalamu'alaikum, saya ingin mengambil bagian${role} dalam Program Lelang Donasi Pembangunan Pondok Pesantren Tahap I dengan nominal ${amountText}.\n\nMohon informasi selanjutnya mengenai penyaluran donasi.\n\nJazakumullahu khairan.`;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [showInfo, setShowInfo] = useState(false);

  const progress = programProgress.target ? (programProgress.collected / programProgress.target) * 100 : 0;

  const participate = (category, amount) => {
    window.open(waUrl(donationMessage(category, amount)), "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <header className="navbar">
        <div className="container nav-inner">
          <a href="#beranda" className="brand" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark"><img src={logo} alt="" /></span>
            {/* <span className="brand-mark"><Sparkles size={18}/></span> */}
            <span><b>Jamiatul Ulum Al Fatah</b><small>Program Pembangunan Pondok</small></span>
          </a>
          <button className="menu-btn" aria-label="Buka menu" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X/> : <Menu/>}
          </button>
          <nav className={menuOpen ? "nav-links open" : "nav-links"}>
            {[
              ["Beranda","#beranda"], ["Tentang Program","#program"], ["Tahapan","#tahapan"],
              ["Dana","#dana"], ["Transparansi","#transparansi"], ["Yayasan","#yayasan"],
              ["Proposal","#proposal"]
            ].map(([label,href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
            <a className="nav-cta" href="#ambil-bagian" onClick={() => setMenuOpen(false)}>Ambil Bagian</a>
          </nav>
        </div>
      </header>

      <main>
        <section id="beranda" className="hero">
          <div className="hero-pattern"/>
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><span/> PROGRAM LELANG DONASI — TAHAP I</div>
              <h1>Bersama Membangun <em>Generasi Qur'ani</em></h1>
              <p className="lead">
                Mari mengambil bagian dalam persiapan pembangunan Pondok Pesantren
                melalui kontribusi sesuai kemampuan dan keikhlasan.
              </p>
              <div className="hero-actions">
                <button className="btn btn-primary" onClick={() => participate(null, null)}>
                  Ambil Bagian Sekarang <ArrowRight size={18}/>
                </button>
                <a className="btn btn-ghost" href="#program">Pelajari Program</a>
              </div>
              <div className="trust-row">
                <span><ShieldCheck size={17}/> Amanah</span>
                <span><ShieldCheck size={17}/> Transparan</span>
                <span><ShieldCheck size={17}/> Akuntabel</span>
              </div>
            </div>

            <div className="hero-card">
              <div className="hero-card-top">
                <span>Target Program</span>
                <span className="status-pill">Tahap I</span>
              </div>
              <strong>{rupiah(siteConfig.targetAmount)}</strong>
              <div className="progress-meta"><span>Progress tercatat</span><b>{progress.toFixed(0)}%</b></div>
              <div className="progress"><span style={{width:`${progress}%`}}/></div>
              <p className="muted">
                Belum ada data penghimpunan aktual pada versi awal website.
              </p>
              <div className="hero-card-divider"/>
              <div className="mini-purpose">
                <Landmark size={20}/>
                <div><b>Persiapan Kawasan Pembangunan</b><span>Akses, lahan, administrasi, legalitas, dan persiapan teknis.</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="notice-strip">
          <div className="container notice">
            <Info size={20}/>
            <p><b>Penting:</b> “Lelang Donasi” bukan lelang barang dan bukan kegiatan jual beli.</p>
            <button onClick={() => setShowInfo(!showInfo)}>{showInfo ? "Tutup" : "Pahami konsep"} <ChevronDown size={17}/></button>
          </div>
          {showInfo && <div className="container notice-detail">Tidak ada barang yang dilelang, sistem bidding, penawaran harga, pemenang lelang, marketplace, maupun transaksi jual-beli. Istilah ini digunakan untuk menggambarkan kesempatan masyarakat mengambil bagian sesuai kemampuan dan keikhlasan sampai target dana terpenuhi.</div>}
        </section>

        <section id="program" className="section">
          <div className="container two-col">
            <div>
              <span className="section-kicker">MENGAPA PROGRAM INI</span>
              <h2>Mempersiapkan lahan sebelum pembangunan fisik dimulai.</h2>
            </div>
            <div className="prose">
              <p>Pendidikan Islam merupakan bagian penting dalam membangun generasi yang berilmu, beriman, dan berakhlak mulia. Yayasan telah memiliki lahan yang dipersiapkan sebagai lokasi pembangunan Pondok Pesantren.</p>
              <p>Sebelum fasilitas utama dibangun, kawasan tersebut membutuhkan persiapan agar proses pembangunan dapat berjalan efektif, aman, dan berkelanjutan.</p>
              <p>Karena itu, Tahap I difokuskan pada persiapan kawasan pembangunan sebagai fondasi bagi tahapan berikutnya.</p>
            </div>
          </div>
        </section>

        <section className="section soft">
          <div className="container">
            <div className="section-heading">
              <span className="section-kicker">KONDISI SAAT INI</span>
              <h2>Lahan telah dipersiapkan untuk menjadi lokasi Pondok Pesantren.</h2>
              <p>Yang diperlukan pada Tahap I adalah persiapan kawasan menuju pembangunan fisik.</p>
            </div>
            <div className="feature-grid">
              {["Penyediaan akses", "Pengukuran & pematokan", "Administrasi & legalitas", "Pembersihan lahan", "Penataan awal kawasan", "Persiapan teknis"].map((x,i) =>
                <div className="feature-card" key={x}><span className="number">{String(i+1).padStart(2,"0")}</span><b>{x}</b></div>
              )}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-heading">
              <span className="section-kicker">RENCANA FASILITAS</span>
              <h2>Apa yang direncanakan untuk kawasan Pondok Pesantren?</h2>
              <p>Fasilitas berikut merupakan rencana keseluruhan kawasan. Rp250 juta bukan biaya seluruh pembangunan.</p>
            </div>
            <div className="facility-grid">
              {facilities.map((x,i) => <div className="facility" key={x}><CheckCircle2 size={18}/><span><b>{String(i+1).padStart(2,"0")}</b>{x}</span></div>)}
            </div>
          </div>
        </section>

        <section id="tahapan" className="section dark-section">
          <div className="container">
            <div className="section-heading light">
              <span className="section-kicker">ROADMAP PEMBANGUNAN</span>
              <h2>Setiap tahap menjadi fondasi bagi tahap berikutnya.</h2>
              <p>Pembangunan direncanakan bertahap sesuai kebutuhan, kemampuan, dan ketersediaan dana.</p>
            </div>
            <div className="timeline">
              {stages.map(([a,b,c],i) => <div className={i===0 ? "timeline-item active" : "timeline-item"} key={a}>
                <div className="timeline-dot">{i+1}</div>
                <div><span>{a}</span><h3>{b}</h3><p>{c}</p></div>
              </div>)}
            </div>
          </div>
        </section>

        <section id="dana" className="section">
          <div className="container">
            <div className="section-heading">
              <span className="section-kicker">RENCANA PENGGUNAAN DANA</span>
              <h2>Rp250 juta untuk persiapan kawasan Tahap I.</h2>
              <p>Berikut adalah rencana penggunaan dana sebagaimana tercantum dalam proposal.</p>
            </div>
            <div className="fund-grid">
              <div className="fund-list">
                {fundAllocation.map(([name,amount]) => {
                  const pct = amount / siteConfig.targetAmount * 100;
                  return <div className="fund-row" key={name}>
                    <div className="fund-title"><span>{name}</span><b>{rupiah(amount)}</b></div>
                    <div className="bar"><span style={{width:`${pct}%`}}/></div>
                    <small>{pct.toFixed(1)}% dari target Tahap I</small>
                  </div>
                })}
              </div>
              <div className="total-card"><span>Total kebutuhan dana</span><strong>{rupiah(siteConfig.targetAmount)}</strong><p>Dana Tahap I dipergunakan untuk mempersiapkan kawasan pembangunan, bukan untuk menyelesaikan seluruh fasilitas Pondok Pesantren.</p></div>
            </div>
          </div>
        </section>

        <section id="ambil-bagian" className="section soft">
          <div className="container">
            <div className="section-heading">
              <span className="section-kicker">TARGET PARTISIPASI</span>
              <h2>Ambil bagian sesuai kemampuan dan keikhlasan.</h2>
              <p>Kategori berikut adalah target partisipasi dalam proposal, bukan kewajiban nominal donasi.</p>
            </div>
            <div className="category-grid">
              {categories.map(c => <div className="category-card" key={c.name}>
                <span className="category-label">{c.name}</span>
                <strong>{rupiah(c.amount)}</strong>
                <p>Target {c.donors} orang</p>
                <button className="btn btn-primary full" onClick={() => participate(c.name, c.amount)}>Ambil Bagian <MessageCircle size={17}/></button>
              </div>)}
              <div className="category-card custom">
                <span className="category-label">Nominal Lain</span>
                <strong>Sesuai kemampuan</strong>
                <p>Anda tetap dapat mengambil bagian dengan nominal yang Anda mampu.</p>
                <label className="amount-input"><span>Rp</span><input inputMode="numeric" value={customAmount} onChange={e=>setCustomAmount(e.target.value.replace(/\D/g,""))} placeholder="Masukkan nominal"/></label>
                <button className="btn btn-outline full" onClick={() => participate("Partisipan", customAmount ? Number(customAmount) : null)}>Hubungi Panitia <MessageCircle size={17}/></button>
              </div>
            </div>
          </div>
        </section>

        <section className="section explain">
          <div className="container explain-box">
            <div className="explain-icon"><HeartHandshake/></div>
            <div>
              <span className="section-kicker">MEMAHAMI PROGRAM</span>
              <h2>Lelang Donasi Bukan Lelang Barang</h2>
              <p>Dalam program ini, “Lelang Donasi” bukanlah kegiatan jual beli atau lelang barang. Tidak ada aset yang diperjualbelikan dan tidak ada sistem penawaran harga.</p>
              <p>Istilah tersebut digunakan sebagai bentuk ajakan kepada masyarakat untuk mengambil bagian dalam pembangunan Pondok Pesantren sesuai kemampuan dan keikhlasan masing-masing sampai target dana terpenuhi.</p>
              <div className="flow">
                {["Pilih nominal","Hubungi panitia","Terima informasi penyaluran","Lakukan donasi","Kontribusi dihimpun","Target terpenuhi"].map((x,i)=><div key={x}><b>{String(i+1).padStart(2,"0")}</b><span>{x}</span></div>)}
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container steps">
            <div className="section-heading"><span className="section-kicker">CARA BERPARTISIPASI</span><h2>Empat langkah sederhana.</h2></div>
            <div className="step-grid">
              {[
                ["01","Pilih bentuk partisipasi","Tentukan kategori atau nominal sesuai kemampuan."],
                ["02","Klik Ambil Bagian","CTA akan menyiapkan pesan WhatsApp."],
                ["03","Hubungi Panitia","Panitia memberikan informasi mengenai penyaluran donasi."],
                ["04","Lakukan penyaluran","Donasi disalurkan sesuai informasi dari panitia."]
              ].map(([n,t,d])=><article className="step-card" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}
            </div>
          </div>
        </section>

        <section id="transparansi" className="section soft">
          <div className="container">
            <div className="section-heading"><span className="section-kicker">TRANSPARANSI</span><h2>Amanah harus dapat dipertanggungjawabkan.</h2><p>Yayasan menyatakan komitmen pada pengelolaan yang amanah, profesional, transparan, dan berkelanjutan.</p></div>
            <div className="trust-grid">
              {["Amanah","Transparan","Akuntabel","Profesional","Efektif"].map(x=><div className="trust-card" key={x}><ShieldCheck/><b>{x}</b></div>)}
            </div>
            <div className="updates"><div><h3>Update Program</h3><p>Belum ada pembaruan yang dipublikasikan.</p></div><span>V1</span></div>
          </div>
        </section>

        <section id="yayasan" className="section">
          <div className="container foundation-grid">
            <div>
              <span className="section-kicker">TENTANG YAYASAN</span>
              <h2>{siteConfig.foundationName}</h2>
              <p>Yayasan merupakan lembaga sosial, pendidikan, dan keagamaan yang berikhtiar memberikan kontribusi melalui pendidikan Islam, dakwah, kegiatan sosial, dan pembinaan generasi muda.</p>
              <h3>Bidang kegiatan</h3>
              <div className="tag-list">{["Pendidikan Islam","Dakwah & Pembinaan Umat","Tahfiz Al-Qur'an","Kegiatan Sosial & Kemanusiaan","Santunan Dhuafa & Yatim","Pemberdayaan Ekonomi Umat","Wakaf, Infak & Sedekah"].map(x=><span key={x}>{x}</span>)}</div>
            </div>
            <div className="legal-card">
              <h3>Identitas & legalitas</h3>
              <dl>
                <dt>Akta Pendirian</dt><dd>Akta Nomor 12 tanggal 21 September 2020</dd>
                <dt>Nomor AHU</dt><dd>AHU-0021727.AH.01.12.TAHUN 2020</dd>
                <dt>NPWP Yayasan</dt><dd>96.628.825.0-225.000</dd>
              </dl>
            </div>
          </div>
        </section>

        <section id="proposal" className="section proposal-section">
          <div className="container proposal-card">
            <div><FileText size={30}/><div><span className="section-kicker">DOKUMEN PENDUKUNG</span><h2>Proposal</h2><p>Proposal lengkap dapat diminta langsung kepada panitia melalui WhatsApp.</p></div></div>
            <a className="btn btn-primary" href={waUrl("Assalamu'alaikum, saya ingin meminta file proposal Program Lelang Donasi Pembangunan Pondok Pesantren Tahap I. Mohon dikirimkan melalui WhatsApp. Jazakumullahu khairan.")} target="_blank" rel="noreferrer">Minta Proposal via WhatsApp <MessageCircle size={18}/></a>
          </div>
        </section>

        <section className="final-cta">
          <div className="container final-inner">
            <span className="section-kicker">AMBIL BAGIAN</span>
            <h2>Bersama membangun fondasi pendidikan Islam.</h2>
            <p>Hubungi panitia untuk mendapatkan informasi mengenai cara penyaluran donasi.</p>
            <button className="btn btn-gold" onClick={() => participate(null,null)}>Ambil Bagian via WhatsApp <MessageCircle size={18}/></button>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-grid">
          <div><div className="brand footer-brand"><span className="brand-mark"><img src={logo} alt="" /></span><span><b>{siteConfig.foundationName}</b><small>Program Lelang Donasi</small></span></div><p>{siteConfig.tagline}</p></div>
          <div><h4>Kontak</h4><p>{siteConfig.address}</p><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><a href={waUrl("Assalamu'alaikum, saya ingin mendapatkan informasi Program Lelang Donasi Pembangunan Pondok Pesantren Tahap I.")} target="_blank" rel="noreferrer">WhatsApp {siteConfig.whatsappDisplay}</a></div>
          <div><h4>Navigasi</h4><a href="#program">Tentang Program</a><a href="#dana">Penggunaan Dana</a><a href="#transparansi">Transparansi</a><a href="#proposal">Proposal</a></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 {siteConfig.foundationName}</span><span>Program Lelang Donasi merupakan program penghimpunan partisipasi untuk mendukung pembangunan Pondok Pesantren Tahap I dan bukan kegiatan jual beli atau lelang barang.</span></div>
      </footer>

      <a className="floating-wa" href={waUrl("Assalamu'alaikum, saya ingin mengambil bagian dalam Program Lelang Donasi Pembangunan Pondok Pesantren Tahap I.\n\nMohon informasi mengenai cara penyaluran donasi.\n\nJazakumullahu khairan.")} target="_blank" rel="noreferrer" aria-label="Ambil Bagian via WhatsApp"><MessageCircle size={22}/><span>Ambil Bagian</span></a>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
