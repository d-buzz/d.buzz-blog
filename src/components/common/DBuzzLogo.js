import React from 'react';

const DBuzzLogo = () => {

  let isDark = false;

  return (
    <React.Fragment>
      { !isDark ? (
         <svg
         height="30"
         viewBox="0 0 5064 1689"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         style={{ marginTop: '0px' }}
       ><path d="M2369.93 871.378V1313.87C2371.39 1430.15 2409.18 1521.72 2483.31 1588.58C2557.44 1655.44 2658.94 1688.87 2787.82 1688.87C2873.09 1688.87 2946.97 1673.85 3009.48 1643.81C3071.98 1613.77 3119.94 1570.17 3153.37 1513C3186.8 1455.34 3203.52 1387.27 3203.52 1308.78V616.188H2948.43V1307.33C2948.43 1372.74 2934.86 1419.97 2907.73 1449.04C2880.6 1478.11 2840.63 1492.65 2787.82 1492.65C2683.16 1492.65 2629.38 1434.75 2626.48 1318.96V1127.92L2369.93 871.378Z" fill="#E61C34"></path><path fillRule="evenodd" clipRule="evenodd" d="M0 616.188V1674.34H348.114C439.684 1673.85 522.534 1652.05 596.662 1608.93C671.276 1565.32 728.931 1505.25 769.629 1428.69C810.812 1351.66 831.403 1264.69 831.403 1167.79V1119.1C830.919 1023.17 809.6 936.685 767.449 859.649C725.782 782.129 667.642 722.293 593.029 680.142C518.416 637.506 434.355 616.188 340.846 616.188H0ZM255.09 1478.11V813.137H340.846C415.944 813.137 473.115 839.058 512.359 890.899C551.604 942.741 571.226 1019.78 571.226 1122.01V1167.79C571.226 1270.51 551.604 1348.03 512.359 1400.35C473.115 1452.19 416.913 1478.11 343.753 1478.11H255.09Z" fill="#E61C34"></path><path d="M1199.14 1471.57C1173.46 1448.32 1141.24 1436.69 1102.48 1436.69C1063.24 1436.69 1030.77 1448.32 1005.1 1471.57C979.902 1494.83 967.305 1524.14 967.305 1559.51C967.305 1594.88 979.902 1624.19 1005.1 1647.45C1030.77 1670.7 1063.24 1682.33 1102.48 1682.33C1141.24 1682.33 1173.46 1670.95 1199.14 1648.17C1224.82 1624.92 1237.66 1595.36 1237.66 1559.51C1237.66 1523.66 1224.82 1494.34 1199.14 1471.57Z" fill="#E61C34"></path><path fillRule="evenodd" clipRule="evenodd" d="M1412.8 1674.34V616.188H1792.89C1929.04 616.188 2032.48 641.139 2103.22 691.043C2174.44 740.946 2210.05 813.379 2210.05 908.341C2210.05 963.09 2197.45 1009.84 2172.26 1048.6C2147.06 1087.36 2110 1115.95 2061.07 1134.36C2116.3 1148.9 2158.69 1176.03 2188.25 1215.76C2217.8 1255.49 2232.58 1303.94 2232.58 1361.11C2232.58 1464.79 2199.63 1542.79 2133.74 1595.12C2068.33 1646.96 1971.19 1673.37 1842.31 1674.34H1412.8ZM1667.89 1224.48V1478.11H1835.05C1881.07 1478.11 1916.44 1467.7 1941.15 1446.86C1965.86 1425.55 1978.22 1395.75 1978.22 1357.47C1978.22 1269.29 1934.37 1224.96 1846.67 1224.48H1667.89ZM1667.89 1057.33H1800.89C1856.61 1056.84 1896.34 1046.67 1920.08 1026.8C1943.82 1006.94 1955.69 977.625 1955.69 938.865C1955.69 894.291 1942.85 862.314 1917.17 842.934C1891.49 823.069 1850.07 813.137 1792.89 813.137H1667.89V1057.33Z" fill="#E61C34"></path><path d="M3649.74 1478.11H4155.56V1674.34H3331.43V1539.89L3835.79 813.137H3328.52V616.188H4150.47V747.003L3649.74 1478.11Z" fill="#E61C34"></path><path d="M5064 1478.11H4558.18L5058.91 747.003V616.188H4236.96V813.137H4744.23L4239.86 1539.89V1674.34H5064V1478.11Z" fill="#E61C34"></path><path fillRule="evenodd" clipRule="evenodd" d="M2292.76 422.561L2166.64 548.682L2124.39 506.426C2077.54 459.578 2077.54 383.621 2124.39 336.772C2129.15 332.013 2134.2 327.738 2139.5 323.946L2116.38 301.018L2036.85 277.74L2045.25 249.063L2132.04 274.468L2167.11 309.237C2209.78 293.275 2259.72 302.453 2294.04 336.772L2296.71 339.438L2636.14 0L2667.84 31.6923C2773.63 137.491 2773.63 309.024 2667.84 414.822C2564.68 517.975 2399.04 520.555 2292.76 422.561ZM2383.73 379.182L2632.2 130.717C2673.55 200.287 2664.3 291.584 2604.45 351.438C2544.6 411.292 2453.3 420.54 2383.73 379.182ZM2161.76 384.541C2143.26 408.164 2144.89 442.418 2166.64 464.17L2251.78 379.029C2230.03 357.277 2195.78 355.649 2172.15 374.145C2170.24 375.641 2168.4 377.269 2166.64 379.029C2164.88 380.788 2163.25 382.63 2161.76 384.541Z" fill="#E61C34"></path><path fillRule="evenodd" clipRule="evenodd" d="M2255.03 647.55L2286.72 615.858C2392.52 510.059 2564.05 510.059 2669.85 615.858C2775.65 721.656 2775.65 893.19 2669.85 998.988L2638.16 1030.68L2255.03 647.55ZM2485.48 751.231L2519.41 785.168L2615.56 689.022C2612.67 685.679 2609.64 682.417 2606.46 679.242C2598.08 670.864 2589.09 663.477 2579.62 657.082L2485.48 751.231ZM2634.21 899.963L2561.67 827.424L2647.31 741.787C2667.22 793.156 2662.86 851.772 2634.21 899.963ZM2443.22 708.975L2385.74 651.498C2426.89 627.039 2475.63 620.28 2520.97 631.22L2443.22 708.975Z" fill="#E61C34"></path><path d="M2094.41 313.31L2007.22 320.773L2009.77 350.544L2085.76 344.039L2102.99 356.698L2120.68 332.623L2094.41 313.31Z" fill="#E61C34"></path><mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="5064" height="1689"><path d="M2369.93 871.378V1313.87C2371.39 1430.15 2409.18 1521.72 2483.31 1588.58C2557.44 1655.44 2658.94 1688.87 2787.82 1688.87C2873.09 1688.87 2946.97 1673.85 3009.48 1643.81C3071.98 1613.77 3119.94 1570.17 3153.37 1513C3186.8 1455.34 3203.52 1387.27 3203.52 1308.78V616.188H2948.43V1307.33C2948.43 1372.74 2934.86 1419.97 2907.73 1449.04C2880.6 1478.11 2840.63 1492.65 2787.82 1492.65C2683.16 1492.65 2629.38 1434.75 2626.48 1318.96V1127.92L2369.93 871.378Z" fill="#E61C34"></path><path fillRule="evenodd" clipRule="evenodd" d="M0 616.188V1674.34H348.114C439.684 1673.85 522.534 1652.05 596.662 1608.93C671.276 1565.32 728.931 1505.25 769.629 1428.69C810.812 1351.66 831.403 1264.69 831.403 1167.79V1119.1C830.919 1023.17 809.6 936.685 767.449 859.649C725.782 782.129 667.642 722.293 593.029 680.142C518.416 637.506 434.355 616.188 340.846 616.188H0ZM255.09 1478.11V813.137H340.846C415.944 813.137 473.115 839.058 512.359 890.899C551.604 942.741 571.226 1019.78 571.226 1122.01V1167.79C571.226 1270.51 551.604 1348.03 512.359 1400.35C473.115 1452.19 416.913 1478.11 343.753 1478.11H255.09Z" fill="#E61C34"></path><path d="M1199.14 1471.57C1173.46 1448.32 1141.24 1436.69 1102.48 1436.69C1063.24 1436.69 1030.77 1448.32 1005.1 1471.57C979.902 1494.83 967.305 1524.14 967.305 1559.51C967.305 1594.88 979.902 1624.19 1005.1 1647.45C1030.77 1670.7 1063.24 1682.33 1102.48 1682.33C1141.24 1682.33 1173.46 1670.95 1199.14 1648.17C1224.82 1624.92 1237.66 1595.36 1237.66 1559.51C1237.66 1523.66 1224.82 1494.34 1199.14 1471.57Z" fill="#E61C34"></path><path fillRule="evenodd" clipRule="evenodd" d="M1412.8 1674.34V616.188H1792.89C1929.04 616.188 2032.48 641.139 2103.22 691.043C2174.44 740.946 2210.05 813.379 2210.05 908.341C2210.05 963.09 2197.45 1009.84 2172.26 1048.6C2147.06 1087.36 2110 1115.95 2061.07 1134.36C2116.3 1148.9 2158.69 1176.03 2188.25 1215.76C2217.8 1255.49 2232.58 1303.94 2232.58 1361.11C2232.58 1464.79 2199.63 1542.79 2133.74 1595.12C2068.33 1646.96 1971.19 1673.37 1842.31 1674.34H1412.8ZM1667.89 1224.48V1478.11H1835.05C1881.07 1478.11 1916.44 1467.7 1941.15 1446.86C1965.86 1425.55 1978.22 1395.75 1978.22 1357.47C1978.22 1269.29 1934.37 1224.96 1846.67 1224.48H1667.89ZM1667.89 1057.33H1800.89C1856.61 1056.84 1896.34 1046.67 1920.08 1026.8C1943.82 1006.94 1955.69 977.625 1955.69 938.865C1955.69 894.291 1942.85 862.314 1917.17 842.934C1891.49 823.069 1850.07 813.137 1792.89 813.137H1667.89V1057.33Z" fill="#E61C34"></path><path d="M3649.74 1478.11H4155.56V1674.34H3331.43V1539.89L3835.79 813.137H3328.52V616.188H4150.47V747.003L3649.74 1478.11Z" fill="#E61C34"></path><path d="M5064 1478.11H4558.18L5058.91 747.003V616.188H4236.96V813.137H4744.23L4239.86 1539.89V1674.34H5064V1478.11Z" fill="#E61C34"></path><path fillRule="evenodd" clipRule="evenodd" d="M2292.76 422.561L2166.64 548.682L2124.39 506.426C2077.54 459.578 2077.54 383.621 2124.39 336.772C2129.15 332.013 2134.2 327.738 2139.5 323.946L2116.38 301.018L2036.85 277.74L2045.25 249.063L2132.04 274.468L2167.11 309.237C2209.78 293.275 2259.72 302.453 2294.04 336.772L2296.71 339.438L2636.14 0L2667.84 31.6923C2773.63 137.491 2773.63 309.024 2667.84 414.822C2564.68 517.975 2399.04 520.555 2292.76 422.561ZM2383.73 379.182L2632.2 130.717C2673.55 200.287 2664.3 291.584 2604.45 351.438C2544.6 411.292 2453.3 420.54 2383.73 379.182ZM2161.76 384.541C2143.26 408.164 2144.89 442.418 2166.64 464.17L2251.78 379.029C2230.03 357.277 2195.78 355.649 2172.15 374.145C2170.24 375.641 2168.4 377.269 2166.64 379.029C2164.88 380.788 2163.25 382.63 2161.76 384.541Z" fill="#E61C34"></path><path fillRule="evenodd" clipRule="evenodd" d="M2255.03 647.55L2286.72 615.858C2392.52 510.059 2564.05 510.059 2669.85 615.858C2775.65 721.656 2775.65 893.19 2669.85 998.988L2638.16 1030.68L2255.03 647.55ZM2485.48 751.231L2519.41 785.168L2615.56 689.022C2612.67 685.679 2609.64 682.417 2606.46 679.242C2598.08 670.864 2589.09 663.477 2579.62 657.082L2485.48 751.231ZM2634.21 899.963L2561.67 827.424L2647.31 741.787C2667.22 793.156 2662.86 851.772 2634.21 899.963ZM2443.22 708.975L2385.74 651.498C2426.89 627.039 2475.63 620.28 2520.97 631.22L2443.22 708.975Z" fill="#E61C34"></path><path d="M2094.41 313.31L2007.22 320.773L2009.77 350.544L2085.76 344.039L2102.99 356.698L2120.68 332.623L2094.41 313.31Z" fill="#E61C34"></path></mask><g mask="url(#mask0)"><path d="M1395.46 1914.89L1306.39 522.195L1856.99 441.224L2156.58 635.553L2747.67 1153.76L2844.83 927.047L2909.61 522.195L5128.2 441.224L5322.53 1914.89H1395.46Z" fill="black"></path></g></svg>
      ): (
        <svg 
          height="30" 
          viewBox="0 0 5064 1689" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          style={{marginTop: '0px'}}
        ><path d="M2369.92 871.445V1313.97C2371.38 1430.26 2409.16 1521.83 2483.29 1588.7C2557.42 1655.57 2658.92 1689 2787.8 1689C2873.07 1689 2946.96 1673.98 3009.46 1643.94C3071.96 1613.89 3119.92 1570.29 3153.36 1513.11C3186.78 1455.45 3203.5 1387.37 3203.5 1308.88V616.234H2948.41V1307.43C2948.41 1372.84 2934.84 1420.08 2907.71 1449.15C2880.58 1478.22 2840.61 1492.76 2787.8 1492.76C2683.15 1492.76 2629.37 1434.86 2626.47 1319.06V1128.01L2369.92 871.445Z" fill="#E61C34"></path><path fillRule="evenodd" clipRule="evenodd" d="M0 616.234V1674.46H348.112C439.682 1673.98 522.531 1652.17 596.659 1609.05C671.271 1565.44 728.926 1505.36 769.622 1428.8C810.809 1351.76 831.396 1264.79 831.396 1167.88V1119.18C830.911 1023.25 809.594 936.755 767.443 859.715C725.778 782.19 667.637 722.345 593.025 680.191C518.413 637.554 434.352 616.234 340.844 616.234H0ZM255.088 1478.22V813.196H340.844C415.941 813.196 473.112 839.12 512.356 890.967C551.601 942.814 571.223 1019.85 571.223 1122.09V1167.88C571.223 1270.6 551.601 1348.13 512.356 1400.46C473.112 1452.3 416.91 1478.22 343.751 1478.22H255.088Z" fill="#E61C34"></path><path d="M1199.13 1471.69C1173.46 1448.43 1141.24 1436.8 1102.47 1436.8C1063.23 1436.8 1030.77 1448.43 1005.09 1471.69C979.896 1494.95 967.3 1524.26 967.3 1559.63C967.3 1595 979.896 1624.32 1005.09 1647.57C1030.77 1670.83 1063.23 1682.46 1102.47 1682.46C1141.24 1682.46 1173.46 1671.07 1199.13 1648.3C1224.81 1625.04 1237.65 1595.48 1237.65 1559.63C1237.65 1523.77 1224.81 1494.46 1199.13 1471.69Z" fill="#E61C34"></path><path fillRule="evenodd" clipRule="evenodd" d="M1412.79 1674.46V616.234H1792.88C1929.03 616.234 2032.47 641.188 2103.2 691.093C2174.43 741 2210.04 813.442 2210.04 908.413C2210.04 963.163 2197.44 1009.92 2172.24 1048.69C2147.05 1087.45 2109.98 1116.03 2061.05 1134.45C2116.29 1148.99 2158.68 1176.12 2188.23 1215.85C2217.79 1255.58 2232.56 1304.03 2232.56 1361.21C2232.56 1464.9 2199.62 1542.91 2133.73 1595.24C2068.32 1647.09 1971.18 1673.49 1842.3 1674.46H1412.79ZM1667.88 1224.57V1478.22H1835.03C1881.06 1478.22 1916.43 1467.81 1941.14 1446.97C1965.85 1425.65 1978.21 1395.86 1978.21 1357.58C1978.21 1269.39 1934.36 1225.06 1846.67 1224.57H1667.88ZM1667.88 1057.4H1800.88C1856.6 1056.92 1896.32 1046.75 1920.07 1026.88C1943.81 1007.01 1955.67 977.699 1955.67 938.934C1955.67 894.362 1942.84 862.379 1917.16 843C1891.48 823.129 1850.05 813.196 1792.88 813.196H1667.88V1057.4Z" fill="#E61C34"></path><path d="M3649.72 1478.22H4155.54V1674.46H3331.41V1540L3835.77 813.196H3328.5V616.234H4150.45V747.059L3649.72 1478.22Z" fill="#E61C34"></path><path d="M5063.97 1478.22H4558.16L5058.89 747.059V616.234H4236.94V813.196H4744.2L4239.84 1540V1674.46H5063.97V1478.22Z" fill="#E61C34"></path><path fillRule="evenodd" clipRule="evenodd" d="M2292.75 422.593L2166.63 548.724L2124.37 506.465C2077.53 459.612 2077.53 383.65 2124.37 336.798C2129.13 332.039 2134.19 327.763 2139.49 323.971L2116.37 301.041L2036.84 277.761L2045.24 249.082L2132.03 274.489L2167.09 309.261C2209.76 293.297 2259.71 302.476 2294.03 336.798L2296.69 339.464L2636.12 0L2667.82 31.6947C2773.62 137.501 2773.62 309.048 2667.82 414.854C2564.67 518.015 2399.03 520.594 2292.75 422.593ZM2383.71 379.211L2632.18 130.727C2673.54 200.302 2664.29 291.606 2604.44 351.465C2544.58 411.323 2453.29 420.572 2383.71 379.211ZM2161.74 384.57C2143.25 408.195 2144.88 442.452 2166.63 464.205L2251.77 379.058C2230.02 357.304 2195.77 355.676 2172.14 374.173C2170.23 375.67 2168.39 377.298 2166.63 379.058C2164.87 380.817 2163.24 382.659 2161.74 384.57Z" fill="#E61C34"></path><path fillRule="evenodd" clipRule="evenodd" d="M2255.01 647.601L2286.7 615.905C2392.5 510.098 2564.03 510.098 2669.83 615.905C2775.63 721.711 2775.63 893.256 2669.83 999.064L2638.14 1030.76L2255.01 647.601ZM2485.46 751.288L2519.4 785.23L2615.54 689.076C2612.65 685.733 2609.62 682.467 2606.45 679.292C2598.07 670.912 2589.07 663.527 2579.61 657.132L2485.46 751.288ZM2634.19 900.033L2561.65 827.487L2647.29 741.841C2667.21 793.216 2662.84 851.839 2634.19 900.033ZM2443.21 709.031L2385.73 651.545C2426.87 627.087 2475.62 620.327 2520.96 631.268L2443.21 709.031Z" fill="#E61C34"></path><path d="M2094.4 313.334L2007.21 320.797L2009.76 350.571L2085.75 344.065L2102.98 356.725L2120.67 332.648L2094.4 313.334Z" fill="#E61C34"></path><mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="5064" height="1689"><path d="M2369.92 871.445V1313.97C2371.38 1430.26 2409.16 1521.83 2483.29 1588.7C2557.42 1655.57 2658.92 1689 2787.8 1689C2873.07 1689 2946.96 1673.98 3009.46 1643.94C3071.96 1613.89 3119.92 1570.29 3153.36 1513.11C3186.78 1455.46 3203.5 1387.37 3203.5 1308.88V616.234H2948.41V1307.43C2948.41 1372.84 2934.84 1420.08 2907.71 1449.15C2880.58 1478.22 2840.61 1492.76 2787.8 1492.76C2683.15 1492.76 2629.37 1434.86 2626.47 1319.06V1128.01L2369.92 871.445Z" fill="#E61C34"></path><path fillRule="evenodd" clipRule="evenodd" d="M0 616.234V1674.46H348.112C439.682 1673.98 522.531 1652.17 596.659 1609.05C671.271 1565.44 728.926 1505.36 769.622 1428.8C810.809 1351.76 831.396 1264.79 831.396 1167.88V1119.18C830.911 1023.25 809.594 936.755 767.443 859.715C725.778 782.19 667.637 722.345 593.025 680.191C518.413 637.554 434.352 616.234 340.844 616.234H0ZM255.088 1478.22V813.196H340.844C415.941 813.196 473.112 839.12 512.356 890.967C551.601 942.814 571.223 1019.85 571.223 1122.09V1167.88C571.223 1270.6 551.601 1348.13 512.356 1400.46C473.112 1452.3 416.91 1478.22 343.751 1478.22H255.088Z" fill="#E61C34"></path><path d="M1199.13 1471.69C1173.46 1448.43 1141.24 1436.8 1102.47 1436.8C1063.23 1436.8 1030.77 1448.43 1005.09 1471.69C979.896 1494.95 967.3 1524.26 967.3 1559.63C967.3 1595 979.896 1624.31 1005.09 1647.57C1030.77 1670.83 1063.23 1682.46 1102.47 1682.46C1141.24 1682.46 1173.46 1671.07 1199.13 1648.3C1224.81 1625.04 1237.65 1595.48 1237.65 1559.63C1237.65 1523.77 1224.81 1494.46 1199.13 1471.69Z" fill="#E61C34"></path><path fillRule="evenodd" clipRule="evenodd" d="M1412.79 1674.46V616.234H1792.88C1929.03 616.234 2032.47 641.188 2103.2 691.093C2174.43 741 2210.04 813.442 2210.04 908.413C2210.04 963.163 2197.44 1009.92 2172.24 1048.69C2147.05 1087.45 2109.98 1116.03 2061.05 1134.45C2116.29 1148.99 2158.68 1176.12 2188.23 1215.85C2217.79 1255.58 2232.56 1304.03 2232.56 1361.21C2232.56 1464.9 2199.62 1542.91 2133.73 1595.24C2068.32 1647.09 1971.18 1673.49 1842.3 1674.46H1412.79ZM1667.88 1224.57V1478.22H1835.03C1881.06 1478.22 1916.43 1467.81 1941.14 1446.97C1965.85 1425.65 1978.21 1395.86 1978.21 1357.58C1978.21 1269.39 1934.36 1225.06 1846.67 1224.57H1667.88ZM1667.88 1057.4H1800.88C1856.6 1056.92 1896.32 1046.75 1920.07 1026.88C1943.81 1007.01 1955.67 977.699 1955.67 938.934C1955.67 894.362 1942.84 862.379 1917.16 843C1891.48 823.129 1850.05 813.196 1792.88 813.196H1667.88V1057.4Z" fill="#E61C34"></path><path d="M3649.72 1478.22H4155.54V1674.46H3331.41V1540L3835.77 813.196H3328.5V616.234H4150.45V747.059L3649.72 1478.22Z" fill="#E61C34"></path><path d="M5063.97 1478.22H4558.16L5058.89 747.059V616.234H4236.94V813.196H4744.2L4239.84 1540V1674.46H5063.97V1478.22Z" fill="#E61C34"></path><path fillRule="evenodd" clipRule="evenodd" d="M2292.75 422.593L2166.63 548.724L2124.37 506.465C2077.53 459.612 2077.53 383.65 2124.37 336.798C2129.13 332.039 2134.19 327.763 2139.49 323.971L2116.37 301.041L2036.84 277.761L2045.24 249.082L2132.03 274.489L2167.09 309.261C2209.76 293.297 2259.71 302.476 2294.03 336.798L2296.69 339.464L2636.12 0L2667.82 31.6947C2773.62 137.501 2773.62 309.048 2667.82 414.854C2564.67 518.015 2399.03 520.594 2292.75 422.593ZM2383.71 379.211L2632.18 130.727C2673.54 200.302 2664.29 291.606 2604.44 351.465C2544.58 411.323 2453.29 420.572 2383.71 379.211ZM2161.74 384.57C2143.25 408.195 2144.88 442.452 2166.63 464.205L2251.77 379.058C2230.02 357.304 2195.77 355.676 2172.14 374.173C2170.23 375.67 2168.39 377.298 2166.63 379.058C2164.87 380.817 2163.24 382.659 2161.74 384.57Z" fill="#E61C34"></path><path fillRule="evenodd" clipRule="evenodd" d="M2255.01 647.601L2286.7 615.905C2392.5 510.098 2564.03 510.098 2669.83 615.905C2775.63 721.711 2775.63 893.256 2669.83 999.064L2638.14 1030.76L2255.01 647.601ZM2485.46 751.288L2519.4 785.23L2615.54 689.076C2612.65 685.733 2609.62 682.467 2606.45 679.292C2598.07 670.912 2589.07 663.527 2579.61 657.132L2485.46 751.288ZM2634.19 900.033L2561.65 827.487L2647.29 741.841C2667.21 793.216 2662.84 851.839 2634.19 900.033ZM2443.21 709.031L2385.73 651.545C2426.87 627.087 2475.62 620.327 2520.96 631.268L2443.21 709.031Z" fill="#E61C34"></path><path d="M2094.4 313.334L2007.21 320.797L2009.76 350.571L2085.75 344.065L2102.98 356.725L2120.67 332.648L2094.4 313.334Z" fill="#E61C34"></path></mask><g mask="url(#mask0)"><path d="M1395.45 1915.03L1306.39 522.235L1856.98 441.258L2156.57 635.601L2747.65 1153.85L2844.81 927.12L2909.59 522.235L5128.17 441.258L5322.49 1915.03H1395.45Z" fill="white"></path></g></svg>
      )}
     </React.Fragment>
  )
}

export default DBuzzLogo
