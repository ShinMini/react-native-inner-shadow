# Changelog

---

## v2.4.0 (feat/radial-shadow branch)

### 🚀 New Features

- **feat: add radial shadow support** - Added comprehensive radial gradient shadow functionality
  - Introduced `RadialInnerShadowProps` type for radial gradient configurations
  - Added `RadialShadowPressableProps` and `RadialShadowToggleProps` for interactive components
  - Implemented `getRadialDirection()` utility function for radial gradient calculations
  - Added `isRadialProps()` type guard for radial gradient detection

- **feat: add reusable base shadow component** - Created `BaseShadowComponent` for improved code reuse
  - Centralized common shadow rendering logic across all shadow components
  - Reduced code duplication between ShadowView, ShadowPressable, and ShadowToggle
  - Improved maintainability and consistency across shadow components

### 🏗️ Architecture Improvements

- **refactor: separate shadow shapes components** - Reorganized component structure
  - Moved `CornerRadii.tsx` to `src/components/shapes/` folder
  - Moved `ShadowLinearGradientFill.tsx` to `src/components/shapes/` folder
  - Improved project organization with dedicated shapes directory

- **performance: optimize for reduced repaint cost** - Enhanced performance when size is fixed
  - Optimized shadow component rendering to minimize unnecessary re-renders
  - Improved layout calculation efficiency
  - Reduced computational overhead in shadow property calculations

### 🔧 Technical Changes

- **Enhanced type system** - Extended shadow type definitions
  - Added `RadialGradientProps` interface with center and radius properties
  - Updated utility functions to support radial gradient detection
  - Improved type safety across shadow components

- **Updated component architecture** - Streamlined shadow component implementation
  - All shadow components now extend from `BaseShadowComponent`(currently only ShadowView)
  - Consistent prop handling across ShadowView, ShadowPressable, and ShadowToggle
  - Unified shadow rendering pipeline

---

## v2.3.1

- feat(release): update version to 2.3.1 and improve dependency compatibility
- chore: change shadowPressable style
- chore: disable eslint rule for inline styles in ShadowPressable component

---

## v2.3.0

- chore: update version to 2.3.0 and adjust dependencies
- chore: refactor ShadowPressable styles and export new hooks
- fix: @shopify/react-native-skia version changes

---

## v2.2.1

- chore: update version to 2.2.1 and refine peerDependencies and keywords
- docs(chore): update README

---

## v2.2.0

- performance: optimize shadow component rendering
- fix: fix shadow component layout size calculation
- fix: fix shadow component border-radius calculation

fix: component layout and shadow rendering

- Add canvas padding constant to prevent shadow clipping
- Centralize shadow property handling in useShadowProperties hook
- Fix component positioning and z-index layering
- Clean up redundant style properties and wrapper elements
- Address shadow rendering issues for toggle and pressable components

feat: refine shadow rendering and default behavior

Apply consistent code formatting and streamline shadow implementation
with unified reflected light behavior and improved gradient handling.

---

## v2.1.0

- performance: optimize shadow component rendering
- fix: fix shadow component layout size calculation
- fix: fix shadow component border-radius calculation

---

## v2.0.2

fix: fix onLayout prop in shadow components
refactor: optimize layout size state updates in shadow components

- Updated ShadowPressable, ShadowToggle, and ShadowView to prevent unnecessary re-renders
- Added comparison logic in setLayoutSize to only update when dimensions change
- Improved performance by using functional state update with previous value check

---

## v.2.0.1

chore: bump package version to 2.0.1

- Updated package.json version number
- Fixed image link in README and README.KR by adding .gif extension

## v.2.0.0

- feat!: can configure any border corner to any shadow component
- Replaced Group and Rect with RoundedRect in CornerRadii
- Removed makeRoundedRectPath utility function from utils.ts
- Updated CornerRadii to use InputRRect type from react-native-skia
- Simplified corner radius calculation and rendering
- Improved component compatibility with Skia's RoundedRect

refactor!: simplify pressable component by removing complicated code by replacing and **deprecating** `shadowSpace`.

- `shadowSpace` now `shadowSpace` replaced with `style.padding` properties

refactor: adjust damping calculation in useAnimatedOffset hook

- Simplified damping calculation by using a fixed 0.5 multiplier
- Removed custom damping prop usage in offset interpolation
- Streamlined animation offset calculation for improved consistency

refactor: enhance shadow types and improve type documentation

- Expanded and refined shadow type definitions in `types.ts`
- Added comprehensive documentation for shadow properties
- Introduced `ShadowProps` as a base type for shadow-related components
- Updated constants and utility functions to align with new type definitions
- Improved type clarity and added more detailed default value descriptions

feat: unify `ShadowPressable` and `ShadowToggle` with linear gradient support

- Introduced UnifiedShadowPressable and UnifiedShadowToggle components
- Added support for linear gradient backgrounds
- Created useAnimatedOffset hook to centralize animation logic
- Improved layout measurement and rendering
- Added LinearShadowPressable and LinearShadowToggle variants

feat: export `LinearShadowPressable` and `LinearShadowToggle` components

- Added exports for LinearShadowPressable and LinearShadowToggle from respective component files
- Expanded component export options in index.ts
- Consistent with previous linear shadow component additions

refactor(chore): remove unused `SHADOW_SPACE` constant

Cleaned up constants by removing the unused `SHADOW_SPACE` constant from the constants file, maintaining a lean and focused set of shadow-related constants.

docs: enhance type documentation with comprehensive comments and examples

- Added detailed JSDoc comments for all types in `types.ts`
- Provided clear explanations for shadow-related type definitions
- Included usage examples for each type
- Improved type documentation with remarks, default values, and type descriptions
- Enhanced readability and understanding of shadow component types

---

## v1.3.1

### Added or Changed

- adjust blur scale for pressable components

---

## v1.3.0

### Added or Changed

- refactor constants prefix by removing `DEFAULT_` from the name

### Removed

- exclude constants exports from `index.ts` file
- remove not used `createStyle` function in `utils.ts`
- deprecated `initialDepth` prop in `ShadowPressable` and `ShadowToggle` components which is now replaced by `shadowOffset` prop

---

## v1.2.5

### Added or Changed

- Change license;
- Add simplified project cover image

### Removed

- Some constants from acknowledgements I no longer use
