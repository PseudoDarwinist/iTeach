



# AI Agent Minimal Workflow

**Purpose:** A stripped‑down set of rules the AI coding assistant must follow for each feature or bug fix.  No cherry‑picking, no advanced Git gymnastics—just the essentials.

---

## 1️⃣ Create a GitHub issue
Always Start with creating a Github Issue by following issues.md file.Then follow the below plan for git and github.

* Add the correct label: `enhancement` or `bug`.

---

## 2️⃣ Create a dedicated branch

```bash
git checkout -b feature/<slug>     # or bug/<slug>
```

Branch off the latest `main` and push immediately so CI runs.

---

## 3️⃣ Implement the change

* Work in **small, logical commits**.
* Each commit must compile and all tests must pass.
* Keep code and comment noise to a minimum.
* **Update CLAUDE.md with any new learnings/context**
* **Test manually across browsers/devices before pushing**

---

## 4️⃣ Push to remote

```bash
git push -u origin <branch>
```

Push whenever you reach a reviewable point.

---

## 5️⃣ Open a Pull Request

```bash
gh pr create --base main --head <branch>
```

* Link the issue (e.g. `Closes #123`).
* PR description: what changed, why, and how to test.
* **Use conventional commit format for PR title**:
  - `feat: add course enrollment form`
  - `fix: carousel navigation on mobile`
  - `docs: update README setup instructions`
* Request review from the human maintainer.

---

## 6️⃣ Await human review & iterate

* Do **not** merge without approval.
* Apply reviewer feedback with new commits on the same branch.

---

## 7️⃣ Merge and clean up

* When approved, choose **“Squash and merge”** (one clean commit lands in `main`).
* Delete the feature branch both locally and on GitHub.
* Confirm the linked issue auto‑closes.

---

That’s it. Follow these seven steps for every task.  Simplicity first; refinements (e.g., cherry‑pick, patch markers) can be added later if needed.

## 8. Update project context

* Update CLAUDE.md with session summary
* Mark any todos as completed
* Document any architectural decisions made

