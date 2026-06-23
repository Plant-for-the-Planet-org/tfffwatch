# Cascade Chat Conversation

Note: _This is purely the output of the chat conversation and does not contain any raw data, codebase snippets, etc. used to generate the output._

### User Input

Understand the Different Dataset Based Applicaiton Flow.
How Different Datasets are being used.
How their states are managed & how they help make the UI.
I want you to understand this Workflow Completely.
This is applied throughout Index & Country Page.

I'll give you the Pages - @[/Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/app/page.tsx] @[/Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/app/(group-ContainerWidth)/[country]/[year]/page.tsx]
Next I'll give you the Map Components where these datasets are used majorly - @[/Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/components/maps/world] @[/Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/components/maps/country]
Next I'll give you the stores - @[/Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/stores/mapStore.ts]
Few important utilities - @[/Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/utils/country-helper.ts] @[/Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/utils/map-colors.ts]
data-fetching handles - @[/Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/utils/axios-helper.ts] @[/Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/utils/forestChange.store.ts]

I have gave you important files.
But You can go ahead & traverse all the the referenced files to get more clear understanding - in fact I encourage that.
So when building the feature there will be enough knowledge to work.

Go ahead.
Do not change anything yet, Just understand the context.

### Planner Response

I'll analyze the dataset-based application flow across the mentioned files. Let me start by reading the key files to understand the architecture.

_Viewed [page.tsx](file:///Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/app/page.tsx) _

_Viewed [page.tsx](file:///Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/app/%28group-ContainerWidth%29/%5Bcountry%5D/%5Byear%5D/page.tsx) _

_Viewed [mapStore.ts](file:///Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/stores/mapStore.ts) _

_Viewed [forestChange.store.ts](file:///Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/utils/forestChange.store.ts) _

_Viewed [axios-helper.ts](file:///Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/utils/axios-helper.ts) _

_Viewed [country-helper.ts](file:///Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/utils/country-helper.ts) _

_Viewed [map-colors.ts](file:///Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/utils/map-colors.ts) _

_Listed directory [world](file:///Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/components/maps/world) _

_Listed directory [country](file:///Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/components/maps/country) _

_Viewed [types.ts](file:///Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/components/maps/shared/types.ts) _

_Viewed [WorldMap.tsx](file:///Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/components/maps/world/WorldMap.tsx) _

_Viewed [CountryMap.tsx](file:///Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/components/maps/country/CountryMap.tsx) _

_Viewed [store.ts](file:///Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/utils/store.ts) _

_Viewed [TFFFMapView.tsx](file:///Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/components/sections/hero/TFFFMapView.tsx) _

_Viewed [DatasetTabs.tsx](file:///Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/components/maps/shared/DatasetTabs.tsx) _

### Planner Response

Now let me explore some additional files to complete the understanding:

_Searched filesystem_

_Viewed [types.ts](file:///Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/utils/types.ts) _

_Viewed [types.ts](file:///Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/utils/types.ts) _

### Planner Response

Based on my analysis of the codebase, I now have a comprehensive understanding of the dataset-based application flow. Let me document this workflow:

# Dataset-Based Application Flow Analysis

## Overview

The TFFF Watch application uses three primary datasets: **JRC** (Joint Research Centre), **GFW_20P** (20% Canopy Cover Estimate), and **GFW_30P** (30% Canopy Cover Estimate). These datasets drive forest change visualization, country eligibility calculations, and payout estimates across both the index (world) and country-specific pages.

## Core Architecture

### 1. Dataset Types & Sources

- **JRC**: Standard Estimate using JRC's Tropical Moist Forest dataset + GFW for subtropical regions
- **GFW_20P**: 20% Canopy Cover Estimate using GFW data (currently uses GFW API as fallback)
- **GFW_30P**: 30% Canopy Cover Estimate using GFW data (currently uses GFW API as fallback)
- All datasets provide forest change metrics, eligibility calculations, and payout estimates

### 2. State Management Structure

#### Global Store ([mapStore.ts](file:///Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/stores/mapStore.ts:0:0-0:0))

- **`useWorldMapStore`**: Manages world map state
  - `selectedDataset`: Current active dataset ("JRC", "GFW_20P", or "GFW_30P")
  - `selectedYear`: Currently selected year
  - `forestData`: Stores data for all three datasets `{JRC: [], GFW_20P: [], GFW_30P: []}`
  - `datasetFetched`: Tracks which datasets have been loaded

- **`useCountryMapStore`**: Manages country-specific map state
  - `dataset`: Dataset for country view
  - `layerData`: Satellite layer data for all three datasets
  - `tfffData`: TFFF calculation data for all three datasets

#### Legacy Store ([store.ts](file:///Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/utils/store.ts:0:0-0:0))

- **`useForestCoverChangeData`**: Forest change data storage
- **`useWorldMap`**: Basic world map state (coordinates, country info)

### 3. Data Flow Architecture

#### Index Page (World View)

```
URL: /page.tsx
├── TFFFWorldMapView Component
│   ├── DatasetTabs (URL-driven dataset selection)
│   │   ├── Reads ?dataset= parameter from URL
│   │   ├── Fetches data via fetchDatasetData()
│   │   └── Updates useWorldMapStore.selectedDataset
│   ├── WorldMap Component
│   │   ├── Consumes selectedDataset from store
│   │   ├── Filters forestData by selectedYear
│   │   └── Renders countries with dataset-specific colors
│   └── Charts & Legends (dataset-aware)
```

#### Country Page

```
URL: /[country]/[year]/page.tsx?dataset=JRC|GFW_20P|GFW_30P
├── TFFFCountryMapView Component
│   ├── Dataset parameter from URL (defaults to JRC)
│   ├── CountryMap Component
│   │   ├── Fetches satellite layers via /api/layers
│   │   ├── Uses dataset-specific layer configurations
│   │   └── Renders country boundaries with dataset data
│   └── ForestCoverChange Component
│       └── Displays dataset-specific forest change metrics
```

### 4. Data Fetching Strategy

#### World Map Data Fetching

- **[DatasetTabs](file:///Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/components/maps/shared/DatasetTabs.tsx:20:0-160:1)** component handles dataset switching
- **`fetchDatasetData()`** fetches ALL years for a dataset at once
- **Caching**: `datasetFetched` prevents duplicate API calls
- **API Endpoint**: `/webhook/uncached/forest_change_and_payouts-v2?source={dataset}`
  - For GFW_20P and GFW_30P: currently uses `source=GFW` as fallback
  - For JRC: uses `source=JRC`

#### Country Map Data Fetching

- **Layer Data**: `/api/layers` proxy endpoint for satellite imagery
- **TFFF Data**: Uses same forest change API but country-specific
- **Forest Change**: [fetchForestCoverChangeDataV2()](file:///Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/utils/forestChange.store.ts:27:0-84:1) with country/year filters
  - For GFW_20P and GFW_30P: currently uses `source=GFW` as fallback

### 5. Color & Visualization System

#### Map Coloring ([map-colors.ts](file:///Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/utils/map-colors.ts:0:0-0:0))

- **Eligibility-based coloring** for all three datasets:
  - `#6FCF97`: ELIGIBLE (meets deforestation criteria)
  - `#8FBDF1`: ALMOST_ELIGIBLE (partial criteria met)
  - `#C4C4C4`: INELIGIBLE (doesn't meet criteria)
- **[updateFeaturesWithColorKeys()](file:///Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/utils/map-colors.ts:72:0-110:1)**: Applies colors to GeoJSON features
- **Dataset-specific color keys**: All datasets use same eligibility logic

### 6. URL-Driven Dataset Selection

#### Dataset Tabs Implementation

- **URL Parameter**: `?dataset=JRC`, `?dataset=GFW_20P`, or `?dataset=GFW_30P`
- **Default**: JRC for country pages, URL-driven for world page
- **Navigation**: Updates URL without page refresh (`scroll: false`)
- **Persistence**: Dataset selection maintained across navigation

### 7. Component Integration Points

#### Shared Components

- **[DatasetTabs](file:///Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/components/maps/shared/DatasetTabs.tsx:20:0-160:1)**: URL-driven dataset selector with three tabs
- **[WorldMap](file:///Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/components/maps/world/WorldMap.tsx:40:0-342:1)/[CountryMap](file:///Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/components/maps/country/CountryMap.tsx:35:0-331:1)**: Dataset-aware map rendering
- **Map Legends**: Dataset-specific legends and information
- **Charts**: Dataset-filtered data visualization

#### Data Transformation

- **[transformAllForestCoverChangeData()](file:///Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/utils/country-helper.ts:72:0-95:1)**: Converts API data to map-ready format
- **Eligibility Logic**: Calculates eligibility based on deforestation rates and trends
- **Color Mapping**: Transforms eligibility to visual colors

### 8. Key Utilities & Helpers

#### Country Management ([country-helper.ts](file:///Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/utils/country-helper.ts:0:0-0:0))

- **[getCountryDetails()](file:///Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/utils/country-helper.ts:14:0-44:1)**: ISO code conversion and country metadata
- **Country mapping**: Slug to ISO2/ISO3 conversion
- **Flag URLs**: Dynamic flag image generation

#### API Layer ([axios-helper.ts](file:///Volumes/WDSN5000/Plant-for-the-Planet/tfff-watch/src/utils/axios-helper.ts:0:0-0:0))

- **Centralized API calls**: All forest data endpoints
- **Error handling**: Consistent error management
- **Caching support**: Next.js fetch options for static generation

### 9. Dataset-Specific Features

#### JRC Dataset

- **Primary dataset**: Default for most views
- **Coverage**: Tropical + subtropical forests
- **Data sources**: JRC tropical data + GFW subtropical supplement

#### GFW_20P Dataset

- **20% Canopy Cover Estimate**: Moderate canopy cover threshold
- **Coverage**: Global tree cover change (uses GFW API as fallback)
- **Use case**: Balanced forest monitoring approach

#### GFW_30P Dataset

- **30% Canopy Cover Estimate**: Higher canopy cover threshold
- **Coverage**: Global tree cover change (uses GFW API as fallback)
- **Use case**: More conservative forest detection

## Summary

The application implements a sophisticated three-dataset architecture where:

1. **Dataset selection is URL-driven** and persists across navigation
2. **State management is centralized** with separate stores for world/country views
3. **Data fetching is optimized** with caching and batch loading
4. **Visual representation is consistent** but dataset-aware
5. **Component architecture is modular** with shared dataset logic
6. **API compatibility is maintained** with fallback to existing GFW endpoints for new datasets

This design allows users to seamlessly switch between three forest monitoring methodologies while maintaining consistent UI/UX and performance across both world and country-specific views. The new GFW_20P and GFW_30P datasets currently use the GFW API as a fallback, with future API endpoints planned for dedicated data sources.
