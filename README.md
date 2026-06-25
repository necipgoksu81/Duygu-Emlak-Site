# Duygu Emlak — Lüleburgaz

Duygu Emlak ofisinin tanıtım web sitesi. Portföy/ilan sitesi değildir; amaç **ofisi tanıtmak** ve daha önceki müşterilerle çekilmiş fotoğraflarla **güven** oluşturmaktır.

🌐 **Yayın adresi:** [duyguemlak.net](https://duyguemlak.net)

## Özellikler

- Tek sayfa, hızlı ve tamamen mobil/masaüstü uyumlu (responsive) tasarım
- 60+ mutlu müşteri fotoğrafı — büyütülebilir galeri (lightbox, klavye ve kaydırma desteği)
- WhatsApp, telefon ve yol tarifi butonları + Google Haritalar konumu
- SEO için yapılandırılmış veri (RealEstateAgent schema), Open Graph etiketleri
- Çerçevesiz, saf HTML/CSS/JS — bağımlılık yok, çok hızlı yüklenir

## Teknik

| Dosya | Açıklama |
|-------|----------|
| `index.html` | Tüm sayfa içeriği |
| `assets/css/styles.css` | Tasarım/stil |
| `assets/js/main.js` | Galeri lightbox, mobil menü, animasyonlar |
| `assets/gallery/` | `thumb/` (galeri küçük) ve `full/` (büyütülmüş) fotoğraflar |
| `CNAME` | Özel alan adı (duyguemlak.net) |

## İletişim bilgileri (güncellemek için)

- **Telefon / WhatsApp:** 0531 793 52 71 → `index.html` içinde `905317935271` aratılarak değiştirilebilir
- **Adres:** Yılmaz Mah., Eski Kırklareli Cd., 39750 Lüleburgaz / Kırklareli
- **Çalışma saatleri:** İletişim bölümünde — gerçek saatlerle güncellenebilir

## Yayına alma (GitHub Pages)

1. Bu depo `main` dalına gönderildiğinde `.github/workflows/deploy.yml` siteyi otomatik yayınlar.
2. GitHub → **Settings → Pages → Source: GitHub Actions** seçili olmalıdır.
3. **Settings → Pages → Custom domain** kısmına `duyguemlak.net` yazın ve alan adı sağlayıcınızda DNS kayıtlarını ekleyin:
   - `A` kayıtları: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - veya `www` için `CNAME` → `<kullanıcıadı>.github.io`
4. "Enforce HTTPS" seçeneğini işaretleyin.
