# Changelog

## Next Steps (Idea Box)

* Generate a processes menu.
* Give each user the ability to select their favorites.
* Evaluate whether it's better to have separate user and client profiles or merge them.
* Implement a security level for certain actions (delete, deactivate).
* Explore how to use the same program with different companies.
* Generate a `Dockerfile` for the frontend and the development environment (`dev`).
* Consider implementing a style constant to centralize button and menu item colors.
* Implement the `user` and `client` tables, including permissions and levels.

---

## 2025/04/23

**Frontend:**

* A new component called `locationSelector` was generated; it will be displayed if accessed from the breadcrumb.
* Both the `SiderBar` and `BreadCrumb` were refactored.
* New icons from different libraries were imported.
* A new component `MessageHistory` was generated, which locally stores up to 100 system messages.
* The `entities.js`, `genericTable.jsx`, and `genericTableContainer.jsx` files were refactored accordingly to the above, to properly receive props and thus display specific rows depending on the table.
* The possibility to "save and add another" was added to the add modal.
* The duplication of spinners in the add and edit modals was fixed.
* A disabling mode for table elements is established, depending on the context.
* An order of view was implemented in the tables; now, they are displayed by the latest created item.

## 2025/04/12

**Frontend:**

* A footer was added to the application.
* Changes were pushed to the `main` and `dev` branches.
* `clamps` were implemented to improve frontend responsiveness.
* The frontend color palette was updated to be more user-friendly.
* The program was verified to display correctly on tablets.

---

## 2025/03/28

**Infrastructure:**

* The application was deployed on Render and is now online.
* Two separate databases were configured for the development (`dev`) and production (`prod`) environments.
* Two distinct URLs were created, one for `dev` and one for `prod`.

**Backend:**

* The loading process for new localities was developed, including the corresponding validation.

**Frontend:**

* Tooltips were added to the icons to improve usability.
* A search filter was implemented in the tables.
* Pagination was added to the tables to facilitate navigation with large datasets.

---

## 2024/03/19

**Backend:**

* Progress was made on the validation of entered information.
* An error that existed in the middlewares and in the Data Access Object (DAO) of the update function was corrected.

**Frontend:**

* Validation was applied in the locality creation files to prevent the entry of certain characters and numbers in the `name` field.
* Validation was applied in the edit modal form, specifically in the `name` field.

---

## 2025/03/17

**Generic Tables:**

* The migration of the `country` table to the generic table was finalized.

**Data Validation:**

* It was defined and recorded where the validation of entered information should be performed and where to place the validation parameters. For example, it was established that the name of an entity (country, state, etc.) should not contain numbers.

---

## 2025/02/22

**Generic Tables:**

* Work was done on creating generic code for table creation, applicable to entities such as `department`, `city`, and `neighborhood`.
* The generic code was finalized, and the functionalities of multiple and single editing were tested.

---

## 2025/01/31

**Frontend:**

* The menu collapse button from the menu options was removed as it was not visually appealing.
