# AI and Operator Handoff

Bu dosya, repoyu ilk kez gorecek gelistirici veya AI ajaninin baslangic sozlesmesidir.

## Once Oku

1. `README.md`
2. `DEPLOYMENT.md`
3. `OPERATIONS.md`
4. `PLATFORM-CAPABILITIES.md`
5. Ortama ozelse `COOLIFY.md` ve Git disinda tutulan private environment runbook'u

## Degismez Kurallar

- Secret degerlerini ciktiya, Git'e veya rapora yazma.
- Canli kaynagi silme, DB apply etme, DNS degistirme veya migration calistirma oncesi yedek ve acik onay al.
- Yalniz Kong publictir.
- Bir stack bir projedir.
- Runtime dosyalarini tek kaynak kabul etme; Git compose ile karsilastir.
- Mevcut degisiklikleri geri alma.
- Once read-only preflight, sonra dar kapsamli degisiklik, sonra smoke test.

## Baslangic Preflight

```bash
git status --short
git log -5 --oneline
docker compose --env-file .env config -q
docker compose ps
docker compose logs --tail=100 kong auth rest realtime storage functions supavisor
```

Kontrol listesi:

- Deploy edilen Git commit SHA
- Container restart sayilari
- Bind mount kaynaklarinin dosya/dizin turu
- Network aliases
- Public URL ve Kong route sonucu
- Backup ve son restore testi tarihi

## Rapor Formati

Rapor; mevcut durum, kanit, degisen dosyalar, calistirilan testler, kalan riskler ve rollback yolunu ayri ayri belirtir. `calisiyor`, `tasindi`, `tam yedek` gibi ifadeler ancak dogrulamasi varsa kullanilir.
