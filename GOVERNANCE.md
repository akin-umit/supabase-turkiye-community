# Governance / Yonetişim

## Amac

Topluluk; Turkce Supabase kaynaklari, self-host hata cozumleri, tekrar kullanilabilir deployment iyilestirmeleri ve upstream katkilar uretir.

## Degisiklik Siniflari

| Etiket | Anlam |
|---|---|
| `community-only` | Turkce dokuman, topluluk sitesi veya egitim icerigi |
| `deployment-only` | Belirli platform/Coolify operasyon iyilestirmesi |
| `upstream-candidate` | Genel Supabase kullanicilarina yararli, upstream'e uygun degisiklik |
| `security` | Hassas inceleme ve private bildirim gerektiren degisiklik |
| `needs-reproduction` | Tekrar uretim kaniti eksik |

## Merge Kosullari

- CI basarili
- En az bir maintainer onayi
- Secret ve musteri bilgisi yok
- Test/tekrar uretim kaniti var
- Lisans ve upstream atfi korunuyor
- Migration varsa rollback yolu belgeli

## Yetkiler

Maintainerlar merge ve release kararini verir. CODEOWNERS incelemesi zorunludur. Yeni maintainer; surekli kaliteli katki, guvenlik disiplini ve topluluk davranisi temelinde eklenir.

## Seffaflik

Kararlar Issue, Discussion veya PR uzerinde kayitli tutulur. Guvenlik aciklari public tartisilmaz.
