# Dashboard: Areas of Expertise — Arabic / English

Backend now treats **Areas of Expertise** the same way as **Skills** / **Categories**: bilingual `ar` + `en` names.

Use this as the checklist for updating the admin dashboard UI.

---

## What changed

| Before | After |
|--------|--------|
| Single field `name` | Nested: `name.ar` + `name.en` on create/update |
| Response only had `name` | Response has `name`, `name_ar`, `name_en` |
| One row per language in DB (duplicates) | One row per topic with both translations |

**Breaking:** create/update payloads that send only `name` will fail validation.

---

## Reference: same pattern as Skills

If Skills create/edit already has Arabic + English name inputs, copy that UX for Areas of Expertise.

---

## Endpoints (unchanged paths)

Base prefix (dashboard API): `/api/v1/dashboard/area-expertises`

| Method | Path | Permission |
|--------|------|------------|
| `GET` | `/area-expertises` | `list area_of_expertises` |
| `GET` | `/area-expertises/show/{id}` | `view area_of_expertises` |
| `POST` | `/area-expertises/store` | `create area_of_expertises` |
| `PUT` | `/area-expertises/update` | `update area_of_expertises` |
| `DELETE` | `/area-expertises/delete/{id}` | `delete area_of_expertises` |

Search autocomplete (general):

| Method | Path |
|--------|------|
| `GET` | `/areaOfExpertise?query=` |

Header (as usual): `X-localization: ar` or `en` — affects the locale-aware `name` field.

---

## Response shape

```json
{
  "id": 3,
  "name": "التسويق الرقمي",
  "name_ar": "التسويق الرقمي",
  "name_en": "Digital Marketing",
  "created_at": "...",
  "updated_at": "..."
}
```

- `name` → current locale (`X-localization` / admin language)
- `name_ar` / `name_en` → always both languages (use these in forms and bilingual tables)

### List (`GET /area-expertises`)

Query params:

- `per_page` (default `10`)
- `search` — matches Arabic **or** English name

Paginated list items use the same fields (`id`, `name`, `name_ar`, `name_en`, …).

---

## Create — `POST /area-expertises/store`

### Body (JSON or form)

```json
{
  "name": {
    "ar": "التسويق الرقمي",
    "en": "Digital Marketing"
  }
}
```

### Validation

- `name.ar` — required, max 255
- `name.en` — required, max 255

### ❌ Old (no longer works)

```json
{
  "name": "Digital Marketing"
}
```

---

## Update — `PUT /area-expertises/update`

```json
{
  "id": 3,
  "name": {
    "ar": "التسويق الرقمي",
    "en": "Digital Marketing"
  }
}
```

- `id` — required
- `name.ar` / `name.en` — required

---

## UI checklist

### List page

- [ ] Show both names (e.g. columns **Name (AR)** / **Name (EN)**), or one column with `name_ar` + `name_en`
- [ ] Do **not** rely only on `name` if the table should show both languages
- [ ] Search box still uses `?search=` (backend searches both locales)

### Create / Edit form

- [ ] Two required inputs: **Name (Arabic)** → `name[ar]` / `name.ar`
- [ ] **Name (English)** → `name[en]` / `name.en`
- [ ] Prefill edit from `show` using `name_ar` and `name_en`
- [ ] Remove the single `name` input

### Selects / autocomplete elsewhere in dashboard

- [ ] Prefer displaying `name` (locale-aware) **or** pick `name_ar` / `name_en` explicitly
- [ ] Option `value` stays the numeric `id`
- [ ] After backend seed/merge, some old duplicate IDs were removed — refresh any cached expertise lists

### Delete

- Unchanged: `DELETE /area-expertises/delete/{id}`

---

## Example form state (React / Vue style)

```ts
// Create / edit form model
{
  id?: number;
  name: {
    ar: string;
    en: string;
  };
}

// Prefill from API show/list item
form.name.ar = item.name_ar ?? '';
form.name.en = item.name_en ?? '';
```

### Axios / fetch payload

```ts
await api.post('/area-expertises/store', {
  name: {
    ar: form.name.ar,
    en: form.name.en,
  },
});

await api.put('/area-expertises/update', {
  id: form.id,
  name: {
    ar: form.name.ar,
    en: form.name.en,
  },
});
```

If you use `FormData` (same nesting as Skills):

```
name[ar]=...
name[en]=...
```

---

## Permissions (unchanged)

- `list area_of_expertises`
- `view area_of_expertises`
- `create area_of_expertises`
- `update area_of_expertises`
- `delete area_of_expertises`

---

## Notes for QA

1. Create with only Arabic or only English → should fail (both required).
2. List search for Arabic term and English term both return the same item.
3. Edit shows both fields filled from `name_ar` / `name_en`.
4. After deploy + seeder, duplicate AR/EN rows are merged into one ID — old bookmarks to deleted IDs may 422.
