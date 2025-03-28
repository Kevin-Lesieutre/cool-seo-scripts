(function() {
    // --- 1. Define Enhanced CSS Styles ---
    const styles = `
        :root {
            /* ACCENT COLOR (RED) */
            --primary-color: #db0022;
            --primary-darker: #b8001a;
            --primary-gradient: linear-gradient(135deg, #e0314f 0%, #b8001a 100%); /* Adjusted gradient */
            --highlight-bg: #fdecea;

            /* NEUTRAL & FUNCTIONAL COLORS */
            --light-bg: #f8f9fa;
            --card-bg: #ffffff;
            --border-color: #dadce0;
            --text-color: #202124;
            --text-secondary: #5f6368;
            --hover-bg: #f1f3f4;
            --tooltip-bg: #3c4043;
            --tooltip-text: #ffffff;

            /* SEMANTIC COLORS */
            --warning-color: #ea4335; /* Red */
            --warning-poor-color: #f29900; /* Orange */
            --warning-medium-color: #f9ab00; /* Yellow/Amber */
            --success-color: #34a853; /* Green */
            --icon-color: var(--text-secondary);

            /* TYPOGRAPHY & LAYOUT */
            --font-stack: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            --border-radius: 16px;
            --card-shadow: 0 8px 16px rgba(0,0,0,0.04); /* Softer shadow */
            --card-shadow-hover: 0 12px 24px rgba(0,0,0,0.08);
        }

        #seo-analysis-output { /* Main container */
             font-family: var(--font-stack); padding: 15px; margin: 30px auto; background-color: transparent; /* Remove bg color */
             border-radius: var(--border-radius); color: var(--text-color); max-width: 1100px; line-height: 1.6; /* Slightly narrower */
             background:white;
        }

        /* Logo Styles - Now inside card */
        .analysis-logo {
            display: block;
            margin: 0 auto 25px auto; /* Center logo with adjusted bottom margin */
            max-height: 40px; /* Slightly smaller logo */
            width: auto;
        }

        /* Overview Card */
        .overview-card {
            background: var(--card-bg); padding: 25px 30px; border-radius: var(--border-radius);
            margin-bottom: 25px; /* REDUCED space below card */
            box-shadow: var(--card-shadow); border: 1px solid var(--border-color); position: relative;
            overflow: hidden; transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .overview-card:hover { box-shadow: var(--card-shadow-hover); transform: translateY(-2px); }
        /* Remove top accent line for cleaner look */
        /* .overview-card::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 5px; background: var(--primary-gradient); } */

        .overview-card-content { display: flex; flex-wrap: wrap; gap: 30px 40px; /* Row and column gap */ }
        .overview-column { flex: 1; min-width: 280px; }
        .overview-column.ranking-col { flex-basis: 60%; }
        .overview-column.details-col { flex-basis: 35%; }
        .overview-card h3 { /* Title inside card columns */
             margin-top: 0; margin-bottom: 20px; color: var(--primary-darker); font-size: 1.2em; /* Slightly smaller */
             font-weight: 600; border-bottom: 1px solid var(--border-color); padding-bottom: 8px; position: relative;
        }
        .overview-card h3::after { display: none; /* Remove underline */ }

        /* Ranking Column Styles */
        .overview-card .ranking-summary { font-size: 1.1em; color: var(--text-color); margin-bottom: 10px; line-height: 1.5; font-weight: 400; }
        .overview-card .ranking-summary strong.query { font-weight: 600; background-color: var(--highlight-bg); padding: 2px 8px; border-radius: 6px; border: 1px solid #fddde2; white-space: nowrap; }
        .overview-card .ranking-summary .avg-pos-value { font-weight: 700; font-size: 1.15em; padding: 0 2px; }
        /* Average Position Color Classes (Remain the same) */
        .avg-pos-value.pos-good { color: var(--success-color); } .avg-pos-value.pos-medium { color: var(--warning-medium-color); } .avg-pos-value.pos-poor { color: var(--warning-poor-color); } .avg-pos-value.pos-bad { color: var(--warning-color); }
        .overview-card .target-url-display { font-size: 1em; color: var(--text-secondary); margin-bottom: 20px; padding: 10px 15px; background-color: var(--light-bg); border-radius: 8px; border-left: 3px solid var(--primary-color); word-break: break-all; }
        .overview-card .target-url-display a { font-weight: 500; color: var(--primary-darker); text-decoration: none; } .overview-card .target-url-display a:hover { text-decoration: underline; }
        .overview-card .distribution-title { font-weight: 600; color: var(--text-secondary); margin-bottom: 10px; margin-top: 15px; font-size: 0.85em; text-transform: uppercase; letter-spacing: 0.8px; }
        .overview-card .distribution-list { list-style: none; padding: 0; margin: 0 0 15px 0; font-size: 0.9em; display: flex; flex-wrap: wrap; gap: 8px; }
        .overview-card .distribution-list li { color: var(--text-secondary); background-color: var(--light-bg); padding: 6px 12px; border-radius: 15px; transition: transform 0.2s, background-color 0.2s; }
        .overview-card .distribution-list li:hover { transform: translateY(-1px); background-color: var(--highlight-bg); }
        .overview-card .distribution-list li::before { display:none; }
        .overview-card .distribution-list .pos-count { font-weight: 600; color: var(--primary-darker); }
        .overview-card .no-ranking-info { font-style: italic; color: var(--text-secondary); margin-top: 16px; font-size: 0.95em; padding: 16px; background-color: var(--light-bg); border-radius: 12px; }
        .overview-card {margin-bottom: 0px; border-bottom-left-radius: 0px; border-bottom-right-radius: 0px; }

        /* Details Column Styles */
        .overview-details-list { background-color: transparent; padding: 0; border-radius: 0; box-shadow: none; }
        .detail-item { display: flex; align-items: center; margin-bottom: 12px; font-size: 0.9em; color: var(--text-secondary); padding-bottom: 12px; border-bottom: 1px dotted var(--border-color); /* Dotted separator */ }
        .detail-item:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
        .detail-icon { width: 20px; height: 20px; margin-right: 10px; flex-shrink: 0; opacity: 0.85; }
        .detail-item .detail-label { font-weight: 500; color: var(--text-secondary); width: auto; margin-right: 6px; flex-shrink: 0; }
        .detail-item .detail-value { font-weight: 600; color: var(--text-color); word-break: break-word; text-align: right; flex-grow: 1; } /* Align value right */
        .detail-item .detail-value.success { color: var(--success-color); } .detail-item .detail-value.warning { color: var(--warning-color); }
        .detail-item .detail-value .flag-emoji { font-size: 1.4em; vertical-align: middle; margin-right: 4px; }

        /* Other Styles */
        #seo-analysis-output h2 { display: none; /* Hide main H2 title */ }
        #seo-analysis-output h3 { /* Remove table titles */ display: none; }
        #seo-analysis-output table { /* Adjust top margin */ margin-top: 0; box-shadow: var(--card-shadow); border-top-left-radius:0px; border-top-right-radius:0px }
        /* Rest of table, cell, link, tooltip, error styles remain the same */
         #seo-analysis-output th, #seo-analysis-output td { padding: 14px 18px; text-align: left; vertical-align: middle; border-bottom: 1px solid var(--border-color); }
         #seo-analysis-output tr:last-child td { border-bottom: none; }
         #seo-analysis-output th { background-color: var(--light-bg); font-weight: 600; color: var(--text-color); white-space: nowrap; border-bottom-width: 2px; position: sticky; top: 0; z-index: 10;}
         #seo-analysis-output tbody tr:hover { background-color: var(--hover-bg); }
         #seo-analysis-output tbody tr.highlight-target-url { background-color: var(--highlight-bg); }
         #seo-analysis-output tbody tr.highlight-target-url:hover { background-color: #fbd5d9; }
         #seo-analysis-output .url-cell { word-break: break-all; max-width: 450px; font-size: 0.95em; display: flex; align-items: center; gap: 10px; }
         #seo-analysis-output .url-cell img.favicon { width: 16px; height: 16px; flex-shrink: 0; border-radius: 3px; }
         #seo-analysis-output a { color: var(--primary-color); text-decoration: none; font-weight: 500; transition: color 0.2s; }
         #seo-analysis-output a:hover { text-decoration: underline; color: var(--primary-darker); }
         #seo-analysis-output .error-message { background-color: #fce8e6; border-left: 4px solid var(--warning-color); color: #c5221f; padding: 16px 20px; border-radius: var(--border-radius); margin-top: 16px; font-weight: 500; box-shadow: var(--card-shadow); }
         [data-tooltip-content] { position: relative; cursor: help; }
         [data-tooltip-content]:hover::after { content: attr(data-tooltip-content); position: absolute; bottom: 115%; left: 50%; transform: translateX(-50%) scale(0.95); background-color: var(--tooltip-bg); color: var(--tooltip-text); padding: 10px 14px; border-radius: 10px; font-size: 0.88em; white-space: pre-line; z-index: 10; min-width: 180px; max-width: 320px; text-align: center; opacity: 0; visibility: hidden; transition: opacity 0.2s ease-out, transform 0.2s ease-out, visibility 0.2s; pointer-events: none; box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
         [data-tooltip-content]:hover::after { opacity: 1; visibility: visible; transform: translateX(-50%) scale(1); }

        /* Responsive */
        @media (max-width: 768px) { .overview-column.ranking-col, .overview-column.details-col { flex-basis: 100%; } /* Stack columns */ /* ... other responsive styles same ... */ }
        @media (max-width: 480px) { /* ... (Same as before) ... */ }
    `;

    // --- Inline SVG Icons ---
    const ICONS = {
        clock: `<svg class="detail-icon" style="color: var(--primary-color);" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/><path fill="currentColor" d="M13 7h-2v6l5.25 3.15.75-1.23-4-2.42V7z"/></svg>`,
        hardDrive: `<svg class="detail-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" x2="2" y1="12" y2="12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" x2="6.01" y1="16" y2="16"/><line x1="10" x2="10.01" y1="16" y2="16"/></svg>`,
        // NEW Earth Icon for Language/Region
        earth: `<svg class="detail-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"/><path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17"/><path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"/><circle cx="12" cy="12" r="10"/></svg>`
    };

    // --- Helper Function for Flags ---
    function countryCodeToEmoji(code) { /* ... (remains the same) ... */
         if (!code || typeof code !== 'string') return ''; const OFFSET = 127397; let codeUpper = code.toUpperCase(); if (codeUpper === 'UK') codeUpper = 'GB'; if (codeUpper === 'EN') codeUpper = 'US'; if (codeUpper.length !== 2) return code.toUpperCase(); const first = codeUpper.charCodeAt(0); const second = codeUpper.charCodeAt(1); if (first < 65 || first > 90 || second < 65 || second > 90) { return code.toUpperCase(); } try { return String.fromCodePoint(first + OFFSET) + String.fromCodePoint(second + OFFSET); } catch (e) { return code.toUpperCase(); }
     }

    // --- 2. Inject Styles ---
    const styleSheet = document.createElement("style"); styleSheet.textContent = styles; document.head.appendChild(styleSheet);

    // --- 3. Create Main Output Container ---
    const containerId = 'seo-analysis-output';
    const existingOutput = document.getElementById(containerId); if (existingOutput) existingOutput.remove();
    const outputContainer = document.createElement('div'); outputContainer.id = containerId;
    // NOTE: Logo is now added INSIDE the overview card generation section

    // --- 4. Core Data Extraction & Processing Logic ---
    let actualDatacenters = 0, missingDatacenters = 0;
    let extractedData = [], top10Competitors = [];
    let firstTargetUrlFound = null, currentQuery = '', currentLangCode = '';
    let averageTargetPosition = null, targetPositionCounts = {};
    let totalPositionSum = 0, foundPositionCount = 0;
    const EXPECTED_DATACENTERS = 10;
    try { // --- (Data extraction logic remains IDENTICAL, including getting query and lang code) ---
         const queryInput = document.getElementById('query'); if (queryInput) { currentQuery = queryInput.value; } const langSelect = document.getElementById('selectpays'); if (langSelect) { currentLangCode = langSelect.value; } console.log('Starting SEO data extraction...'); const resultsContainer = document.getElementById('results'); if (!resultsContainer) throw new Error("Could not find results container id='results'."); const resultDivs = resultsContainer.querySelectorAll('.result'); actualDatacenters = resultDivs.length; missingDatacenters = Math.max(0, EXPECTED_DATACENTERS - actualDatacenters); totalPositionSum = 0; foundPositionCount = 0; targetPositionCounts = {}; extractedData = []; top10Competitors = []; firstTargetUrlFound = null; if (actualDatacenters > 0) { const urlStats = {}; resultDivs.forEach((resultDiv, index) => { const ipElement = resultDiv.querySelector('.ip_center'); const ipAddress = ipElement ? ipElement.textContent.trim() : `N/A_DC_${index + 1}`; const positionNbElement = resultDiv.querySelector('.position .position_nb'); const positionUrlElement = resultDiv.querySelector('.position .position_url'); let targetPositionNumber = 'N/A'; const currentTargetUrl = positionUrlElement ? positionUrlElement.textContent.trim() : null; if (currentTargetUrl && !firstTargetUrlFound) { firstTargetUrlFound = currentTargetUrl; } if (positionNbElement) { const rawPosText = positionNbElement.textContent.trim(); const match = rawPosText.match(/\d+/); if (match) { targetPositionNumber = parseInt(match[0], 10); if (!isNaN(targetPositionNumber)) { totalPositionSum += targetPositionNumber; foundPositionCount++; targetPositionCounts[targetPositionNumber] = (targetPositionCounts[targetPositionNumber] || 0) + 1; } } } extractedData.push({ resultIndex: index + 1, ipAddress: ipAddress, targetPositionNumber: targetPositionNumber, targetPositionUrl: currentTargetUrl }); const urlListItems = resultDiv.querySelectorAll('ol.urlslist li a'); urlListItems.forEach((link, urlIndex) => { const url = link.href; const currentPosition = urlIndex + 1; if (!urlStats[url]) { urlStats[url] = { count: 0, totalPosition: 0, highestPosition: Infinity, lowestPosition: 0, datacentersAtHighest: [], datacentersAtLowest: [] }; } const stats = urlStats[url]; stats.count++; stats.totalPosition += currentPosition; if (currentPosition < stats.highestPosition) { stats.highestPosition = currentPosition; stats.datacentersAtHighest = [ipAddress]; } else if (currentPosition === stats.highestPosition && !stats.datacentersAtHighest.includes(ipAddress)) { stats.datacentersAtHighest.push(ipAddress); } if (currentPosition > stats.lowestPosition) { stats.lowestPosition = currentPosition; stats.datacentersAtLowest = [ipAddress]; } else if (currentPosition === stats.lowestPosition && !stats.datacentersAtLowest.includes(ipAddress)) { stats.datacentersAtLowest.push(ipAddress); } }); }); if (foundPositionCount > 0) { averageTargetPosition = parseFloat((totalPositionSum / foundPositionCount).toFixed(2)); } const competitorList = []; for (const url in urlStats) { const stats = urlStats[url]; if (stats.count > 0) { competitorList.push({ url: url, frequency: stats.count, averagePosition: parseFloat((stats.totalPosition / stats.count).toFixed(2)), highestPosition: stats.highestPosition === Infinity ? 'N/A' : stats.highestPosition, datacentersAtHighest: stats.datacentersAtHighest.length > 0 ? stats.datacentersAtHighest.join('\n') : 'N/A', lowestPosition: stats.lowestPosition === 0 ? 'N/A' : stats.lowestPosition, datacentersAtLowest: stats.datacentersAtLowest.length > 0 ? stats.datacentersAtLowest.join('\n') : 'N/A', }); } } competitorList.sort((a, b) => { if (b.frequency !== a.frequency) return b.frequency - a.frequency; const avgPosA = typeof a.averagePosition === 'number' ? a.averagePosition : Infinity; const avgPosB = typeof b.averagePosition === 'number' ? b.averagePosition : Infinity; return avgPosA - avgPosB; }); top10Competitors = competitorList.slice(0, 10); } console.log('Data extraction complete.');
    } catch (error) { /* ... (Error handling same) ... */ console.error("Error during data extraction/processing:", error); const errorMsg = document.createElement('div'); errorMsg.className = 'error-message'; errorMsg.textContent = `An error occurred: ${error.message}. Check console.`; outputContainer.appendChild(errorMsg); document.body.appendChild(outputContainer); return; }

    // --- 5. Build & Populate HTML ---

    // Helper createTableRow (remains the same)
    function createTableRow(rowDataForVisibleCells, columnConfig, fullDataObject, isHeader = false, highlight = false) { /* ... (same) ... */ const row = document.createElement('tr'); if (highlight) row.classList.add('highlight-target-url'); rowDataForVisibleCells.forEach((item, index) => { const config = columnConfig[index] || {}; const cell = document.createElement(isHeader ? 'th' : 'td'); const cellContent = (item === null || item === undefined) ? 'N/A' : item; if (config.isUrl && !isHeader) { cell.classList.add('url-cell'); const favicon = document.createElement('img'); favicon.classList.add('favicon'); favicon.src = `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${encodeURIComponent(cellContent)}&size=16`; favicon.width = 16; favicon.height = 16; favicon.alt = ""; favicon.onerror = (e) => { e.target.style.visibility = 'hidden'; }; cell.appendChild(favicon); const link = document.createElement('a'); link.href = cellContent; link.textContent = cellContent; link.target = '_blank'; link.rel = 'noopener noreferrer'; cell.appendChild(link); } else if (config.tooltipKey && !isHeader && fullDataObject && fullDataObject[config.tooltipKey] && fullDataObject[config.tooltipKey] !== 'N/A') { cell.textContent = cellContent; cell.setAttribute('data-tooltip-content', fullDataObject[config.tooltipKey]); } else { cell.textContent = cellContent; } if (config.align) cell.style.textAlign = config.align; if (config.numeric && !isHeader) cell.style.fontVariantNumeric = 'tabular-nums'; row.appendChild(cell); }); return row;}

    // --- Render Overview Card ---
    const overviewCard = document.createElement('div'); overviewCard.className = 'overview-card';

    // Add Logo INSIDE the card, at the top
    const logoImg = document.createElement('img');
    logoImg.src = 'https://seo-hero.ninja/images/seo-hero-logo.png';
    logoImg.alt = 'SEO Hero Ninja Logo';
    logoImg.className = 'analysis-logo';
    overviewCard.appendChild(logoImg); // Logo added first

    // Card Content container
    const overviewContent = document.createElement('div'); overviewContent.className = 'overview-card-content';
    const rankingColumn = document.createElement('div'); rankingColumn.className = 'overview-column ranking-col';
    const detailsColumn = document.createElement('div'); detailsColumn.className = 'overview-column details-col';

    // Populate Ranking Column (Left) - UPDATED
    const overviewTitle = document.createElement('h3'); overviewTitle.textContent = 'Ranking Snapshot'; rankingColumn.appendChild(overviewTitle);
    let avgPosClass = ''; // Determine color class for average position
    if (averageTargetPosition !== null) { if (averageTargetPosition <= 5) avgPosClass = 'pos-good'; else if (averageTargetPosition <= 10) avgPosClass = 'pos-medium'; else if (averageTargetPosition <= 20) avgPosClass = 'pos-poor'; else avgPosClass = 'pos-bad'; }
    if (averageTargetPosition !== null && foundPositionCount > 0 && currentQuery && firstTargetUrlFound) {
        const summaryP = document.createElement('p'); summaryP.className = 'ranking-summary';
        summaryP.innerHTML = `<strong class="query">${currentQuery.replace(/</g, "&lt;")}</strong> is on avg. position <span class="avg-pos-value ${avgPosClass}">${averageTargetPosition}</span> across <span class="avg-pos-value ${avgPosClass}">${foundPositionCount}</span> datacenters with the URL:`;
        rankingColumn.appendChild(summaryP);
        const urlP = document.createElement('p'); urlP.className = 'target-url-display';
        urlP.innerHTML = `<a href="${firstTargetUrlFound}" target="_blank" rel="noopener noreferrer">${firstTargetUrlFound}</a>`; // No "URL Found:" prefix
        rankingColumn.appendChild(urlP);
        const sortedPositions = Object.keys(targetPositionCounts).map(Number).sort((a, b) => a - b);
        if (sortedPositions.length > 0) { const distTitle = document.createElement('p'); distTitle.className = 'distribution-title'; distTitle.textContent = 'Position Distribution:'; rankingColumn.appendChild(distTitle); const distList = document.createElement('ul'); distList.className = 'distribution-list'; sortedPositions.forEach(pos => { const count = targetPositionCounts[pos]; const li = document.createElement('li'); li.innerHTML = `Posistion <span class="pos-count">${pos}</span> on <span class="pos-count">${count}</span> Datacenter(s)`; distList.appendChild(li); }); rankingColumn.appendChild(distList); }
     } else if (currentQuery) { /* ... (Handle no ranking found - same as before) ... */ const queryP = document.createElement('p'); queryP.className = 'ranking-summary'; queryP.innerHTML = `For query: <strong class="query">${currentQuery.replace(/</g, "&lt;")}</strong>`; rankingColumn.appendChild(queryP); const noRankP = document.createElement('p'); noRankP.className = 'no-ranking-info'; if (actualDatacenters > 0) { noRankP.textContent = 'Target URL not found ranking in the results.'; } else { noRankP.textContent = 'No responding datacenters to analyze ranking.'; } rankingColumn.appendChild(noRankP);
    } else { /* ... (Handle no data - same as before) ... */ const noDataP = document.createElement('p'); noDataP.className = 'no-ranking-info'; noDataP.textContent = 'No ranking data available.'; rankingColumn.appendChild(noDataP); }


    // Populate Details Column (Right) - UPDATED
    const detailsTitle = document.createElement('h3'); detailsTitle.textContent = 'Analysis Details'; detailsColumn.appendChild(detailsTitle);
    const detailsContainer = document.createElement('div'); detailsContainer.className = 'overview-details-list';
    function addDetailItem(iconSvg, label, value, valueClass = '') { /* ... (same helper function) ... */ const item = document.createElement('div'); item.className = 'detail-item'; item.innerHTML = `${iconSvg}<span class="detail-label">${label}:</span><span class="detail-value ${valueClass}">${value}</span>`; detailsContainer.appendChild(item); }

    // Add detail items - UPDATED with Language/Flag
    addDetailItem(ICONS.clock, 'Timestamp', new Date().toLocaleString());
    if (currentLangCode) {
        const flag = countryCodeToEmoji(currentLangCode);
        addDetailItem(ICONS.earth, 'Region', `<span class="flag-emoji" aria-label="${currentLangCode.toUpperCase()} flag">${flag}</span> ${currentLangCode.toUpperCase()}`); // Use Earth icon
    }
    addDetailItem( ICONS.hardDrive.replace('currentColor', 'var(--success-color)'), 'Responding', `${actualDatacenters} / ${EXPECTED_DATACENTERS}`, 'success' );
    if (missingDatacenters > 0) { addDetailItem( ICONS.hardDrive.replace('currentColor', 'var(--warning-color)'), 'Missing', `${missingDatacenters} / ${EXPECTED_DATACENTERS}`, 'warning' ); }

    detailsColumn.appendChild(detailsContainer);
    overviewContent.appendChild(rankingColumn); overviewContent.appendChild(detailsColumn); overviewCard.appendChild(overviewContent);
    outputContainer.appendChild(overviewCard); // Append card AFTER logo

    // --- Render Tables (No Titles) ---
    if (extractedData.length > 0) { // Datacenter Table
        const dcTable = document.createElement('table'); /* ... (rest of table creation same) ... */ const dcThead = document.createElement('thead'); const dcTbody = document.createElement('tbody'); const dcHeaders = ['#', 'IP Address', 'Target Pos.', 'Target URL']; const dcColumnConfig = [ { numeric: true, align: 'center' }, { }, { numeric: true, align: 'center' }, { isUrl: true } ]; dcThead.appendChild(createTableRow(dcHeaders, dcColumnConfig.map(c => ({ align: c.align })), null, true)); extractedData.forEach(dc => { const dcRowData = [dc.resultIndex, dc.ipAddress, dc.targetPositionNumber, dc.targetPositionUrl]; dcTbody.appendChild(createTableRow(dcRowData, dcColumnConfig, dc)); }); dcTable.appendChild(dcThead); dcTable.appendChild(dcTbody); outputContainer.appendChild(dcTable);
    }
    if (top10Competitors.length > 0) { // Competitor Table
        const compTable = document.createElement('table'); /* ... (rest of table creation same) ... */ const compThead = document.createElement('thead'); const compTbody = document.createElement('tbody'); const compHeaders = ['Competitor URL', 'Freq.', 'Avg Pos', 'Best Pos', 'Worst Pos']; const compColumnConfig = [ { key: 'url', isUrl: true }, { key: 'frequency', numeric: true, align: 'center' }, { key: 'averagePosition', numeric: true, align: 'center' }, { key: 'highestPosition', numeric: true, align: 'center', tooltipKey: 'datacentersAtHighest' }, { key: 'lowestPosition', numeric: true, align: 'center', tooltipKey: 'datacentersAtLowest' } ]; compThead.appendChild(createTableRow(compHeaders, compColumnConfig.map(c => ({ align: c.align })), null, true)); top10Competitors.forEach(comp => { const visibleRowData = compColumnConfig.map(config => comp[config.key]); const isTarget = firstTargetUrlFound && comp.url === firstTargetUrlFound; compTbody.appendChild(createTableRow(visibleRowData, compColumnConfig, comp, false, isTarget)); }); compTable.appendChild(compThead); compTable.appendChild(compTbody); outputContainer.appendChild(compTable);
    } else if (actualDatacenters > 0) { const noCompDataMsg = document.createElement('p'); noCompDataMsg.textContent = 'No competitor URLs found.'; outputContainer.appendChild(noCompDataMsg); }

    // --- 6. Append to Body & Scroll ---
    document.body.appendChild(outputContainer);
    console.log('Analysis report updated.');
    overviewCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

})(); // Immediately execute the function