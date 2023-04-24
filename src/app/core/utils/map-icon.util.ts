export const getMarkerColorByStatus = (status: string, highlight = false) => {
  switch (status) {
    case 'Completed':
    case 'Received':
      return highlight
        ? { fill: '#722ED1', stroke: '#D3ADF7' }
        : { fill: '#F9F0FF', stroke: '#722ED1' };

    case 'Planning':
    case 'Delivery':
    case 'Delivering':
      return highlight
        ? { fill: '#52C41A', stroke: '#B7EB8F' }
        : { fill: '#F6FFED', stroke: '#52C41A' };

    case 'Locked':
      return { fill: '#FFF1F0', stroke: '#FF4D4F' };

    default:
      return highlight
        ? { fill: '#722ED1', stroke: '#D3ADF7' }
        : { fill: '#F9F0FF', stroke: '#722ED1' };
  }
};

export const getVehicleIconByStatus = (
  status: string | undefined,
  rotate: number = 0,
) => {
  switch (status) {
    case 'Busy':
      return {
        icon: `<svg style="{ transform: 'rotate(${rotate}deg)'}" xmlns="http://www.w3.org/2000/svg" width="15" height="30" viewBox="0 0 15 30" fill="#fffff">
      <g clip-path="url(#clip0_1820_98699)">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.889 0.00976586L4.11627 0.00976645C2.62544 0.00976658 1.40944 1.25592 1.40944 2.77515L1.40944 28.5059C1.40944 29.3252 2.0645 29.9944 2.86638 29.9944L12.1351 29.9944C12.937 29.9944 13.592 29.3251 13.592 28.5059L13.592 2.77515C13.5958 1.25592 12.376 0.00976573 10.889 0.00976586Z" fill="#D12817"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3732 0.00976583L4.62826 0.00976633C3.36332 0.00976644 2.33179 1.06746 2.33179 2.35592L2.33179 28.7328C2.33179 29.429 2.88897 29.9982 3.57038 29.9982L11.4348 29.9982C12.1163 29.9982 12.6734 29.429 12.6734 28.7328L12.6734 2.35592C12.6734 1.06746 11.6381 0.00976572 10.3732 0.00976583Z" fill="#F5222D"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.889 0.00976584L4.11625 0.00976643C3.0659 0.00976652 2.15107 0.628998 1.70307 1.52515L13.2984 1.52515C12.8504 0.628997 11.9355 0.00976574 10.889 0.00976584Z" fill="#D12817"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.69956 15.3984C9.6205 15.3984 9.55651 15.4638 9.55651 15.5446L9.55651 26.7946C9.55651 26.8754 9.62051 26.9407 9.69956 26.9407C9.77862 26.9407 9.84262 26.8754 9.84262 26.7946L9.84262 15.5446C9.84639 15.4638 9.77862 15.3984 9.69956 15.3984Z" fill="#0A9E0E"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.28452 15.3984C8.20547 15.3984 8.14146 15.4638 8.14146 15.5446L8.14146 26.7946C8.14146 26.8754 8.20547 26.9407 8.28452 26.9407C8.36358 26.9407 8.42759 26.8754 8.42759 26.7946L8.42758 15.5446C8.43135 15.4638 8.36358 15.3984 8.28452 15.3984Z" fill="#0A9E0E"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M6.86948 15.3984C6.79043 15.3984 6.72642 15.4638 6.72642 15.5446L6.72643 26.7946C6.72643 26.8754 6.79043 26.9407 6.86949 26.9407C6.94854 26.9407 7.01255 26.8754 7.01255 26.7946L7.01255 15.5446C7.01631 15.4638 6.94854 15.3984 6.86948 15.3984Z" fill="#0A9E0E"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.45153 15.3984C5.37247 15.3984 5.30846 15.4638 5.30846 15.5446L5.30847 26.7946C5.30847 26.8754 5.37247 26.9407 5.45153 26.9407C5.53059 26.9407 5.59458 26.8754 5.59458 26.7946L5.59458 15.5446C5.59834 15.4638 5.53058 15.3984 5.45153 15.3984Z" fill="#0A9E0E"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4447 0.109863L4.56425 0.109864C3.65319 0.109864 2.85884 0.686784 2.46731 1.52525L12.5379 1.52524C12.1501 0.686784 11.3558 0.109863 10.4447 0.109863Z" fill="#F5222D"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.072 0.00976577L4.9332 0.00976622C4.01085 0.0097663 3.25791 0.778997 3.25791 1.7213L3.25791 6.78669C3.25791 7.29438 3.66449 7.70592 4.15767 7.70592L10.84 7.70592C11.337 7.70592 11.7398 7.29054 11.7398 6.78669L11.7398 1.7213C11.7436 0.778996 10.9906 0.00976569 10.072 0.00976577Z" fill="#D12817"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4184 0.00976568L7.51955 0.00976594L7.48567 0.00976594L4.58685 0.00976619L3.91296 7.70592L7.48567 7.70592L7.51955 7.70592L11.0923 7.70592L10.4184 0.00976568Z" fill="#F5222D"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9836 5.18652L12.6734 5.18652L12.6734 6.3096L13.9836 6.3096C14.2847 6.3096 14.5332 6.05575 14.5332 5.74806C14.5332 5.44037 14.2847 5.18652 13.9836 5.18652Z" fill="#E0321D"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.01791 5.17529L2.33179 5.17529L2.33179 6.29837L1.01791 6.29837C0.716732 6.29837 0.468257 6.04452 0.468257 5.73683C0.468257 5.42914 0.716732 5.17529 1.01791 5.17529Z" fill="#E0321D"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.6734 6.03271L12.6734 6.30964L13.9835 6.30964C14.1831 6.30964 14.36 6.1981 14.4541 6.03271L12.6734 6.03271Z" fill="#E64E3F"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.33179 6.02539L2.33179 6.30232L1.01791 6.30232C0.818379 6.30232 0.641434 6.19078 0.543552 6.02539L2.33179 6.02539Z" fill="#E64E3F"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.1765 0.00976621C4.17273 0.028997 4.17274 0.0482277 4.17274 0.0674585C4.17274 0.228997 4.28944 0.35977 4.42873 0.35977L10.584 0.359769C10.7233 0.359769 10.84 0.228996 10.84 0.0674579C10.84 0.0482272 10.84 0.0289964 10.8363 0.00976563L4.1765 0.00976621Z" fill="#E0321D"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6984 13.5137C11.593 13.5137 11.5026 13.6021 11.5026 13.7137L11.5026 28.8598C11.5026 28.9675 11.5892 29.0598 11.6984 29.0598C11.8075 29.0598 11.8941 28.9714 11.8941 28.8598L11.8941 13.7137C11.8904 13.6021 11.8038 13.5137 11.6984 13.5137Z" fill="#302E69"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M3.31814 13.5176C3.21273 13.5176 3.12238 13.606 3.12238 13.7176L3.12238 28.8637C3.12238 28.9714 3.20897 29.0637 3.31815 29.0637C3.42356 29.0637 3.51392 28.9753 3.51392 28.8637L3.51392 13.7176C3.51392 13.606 3.42356 13.5176 3.31814 13.5176Z" fill="#302E69"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.69932 15.3984C9.62026 15.3984 9.55627 15.4638 9.55627 15.5446L9.55627 26.7946C9.55627 26.8754 9.62026 26.9407 9.69932 26.9407C9.77838 26.9407 9.84238 26.8754 9.84238 26.7946L9.84238 15.5446C9.84614 15.4638 9.77838 15.3984 9.69932 15.3984Z" fill="#D12817"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.28379 15.3984C8.20473 15.3984 8.14073 15.4638 8.14073 15.5446L8.14073 26.7946C8.14073 26.8754 8.20473 26.9407 8.28379 26.9407C8.36285 26.9407 8.42685 26.8754 8.42685 26.7946L8.42685 15.5446C8.43062 15.4638 8.36285 15.3984 8.28379 15.3984Z" fill="#D12817"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M6.86826 15.3984C6.78921 15.3984 6.7252 15.4638 6.7252 15.5446L6.7252 26.7946C6.7252 26.8754 6.78921 26.9407 6.86827 26.9407C6.94732 26.9407 7.01133 26.8754 7.01133 26.7946L7.01132 15.5446C7.01509 15.4638 6.94732 15.3984 6.86826 15.3984Z" fill="#D12817"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.45275 15.3984C5.37369 15.3984 5.30969 15.4638 5.30969 15.5446L5.30969 26.7946C5.30969 26.8754 5.37369 26.9407 5.45275 26.9407C5.53181 26.9407 5.5958 26.8754 5.5958 26.7946L5.5958 15.5446C5.59956 15.4638 5.5318 15.3984 5.45275 15.3984Z" fill="#D12817"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6683 5.225C9.40943 4.175 5.59578 4.175 3.33696 5.225C2.60284 5.56731 2.64426 6.03654 2.72708 6.74423C2.85884 7.86346 2.99061 8.98269 3.12237 10.1019C6.04379 9.20577 8.96143 9.175 11.8828 10.1019C12.0146 8.98269 12.1464 7.86346 12.2781 6.74423C12.361 6.03654 12.4024 5.56731 11.6683 5.225Z" fill="#302E69"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.69696 6.47893C5.33602 5.19432 9.64661 5.18278 12.3083 6.45201C12.3572 5.90201 12.2932 5.5174 11.6645 5.22509C10.5351 4.69816 9.02543 4.43663 7.51578 4.44047L7.4819 4.44047C5.97225 4.44047 4.46261 4.70201 3.3332 5.22509C2.70073 5.52124 2.64425 5.9174 2.69696 6.47893Z" fill="#232260"/>
      <path d="M3.71342 12.979L11.2918 12.979L11.2918 13.2059L3.71342 13.2059L3.71342 12.979Z" fill="#E0321D"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0885 29.4907L10.3017 29.4907C10.1661 29.4907 10.0532 29.6061 10.0532 29.7446L10.0532 29.9984L11.3332 29.9984L11.3332 29.7446C11.337 29.6061 11.224 29.4907 11.0885 29.4907Z" fill="#302E69"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.04237 29.4907L4.25555 29.4907C4.12002 29.4907 4.00708 29.6061 4.00708 29.7446L4.00708 29.9984L5.28708 29.9984L5.28708 29.7446C5.29084 29.6023 5.1779 29.4907 5.04237 29.4907Z" fill="#302E69"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.6734 6.43652L12.1163 10.1134L12.12 13.0327L12.6734 13.0327L12.6734 6.43652Z" fill="#302E69"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.3318 6.43652L2.88898 10.1134L2.88521 13.0327L2.3318 13.0327L2.3318 6.43652Z" fill="#302E69"/>
      </g>
      <defs>
      <clipPath id="clip0_1820_98699">
      <rect width="15" height="30" fill="white" transform="matrix(-1 8.74228e-08 8.74228e-08 1 15 0)"/>
      </clipPath>
      </defs>
      </svg>`,
      };
    case 'Scheduling':
      return {
        icon: `<svg style="{ transform: 'rotate(${rotate}deg)'}" xmlns="http://www.w3.org/2000/svg" width="15" height="30" viewBox="0 0 15 30" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.1134 2.5202e-07L3.89049 8.83471e-07C2.30055 1.02247e-06 1.0037 1.24663 1.0037 2.76644L1.00371 28.507C1.00371 29.3265 1.70231 29.996 2.5575 29.996L12.4424 29.996C13.2976 29.996 13.9962 29.3265 13.9962 28.507L13.9962 2.76644C14.0002 1.24663 12.6994 1.13374e-07 11.1134 2.5202e-07Z" fill="#26BA28"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5635 2.14461e-07L4.43658 7.5009e-07C3.08754 8.68026e-07 1.98744 1.05809 1.98744 2.34705L1.98744 28.734C1.98744 29.4304 2.58166 29.9998 3.30837 29.9998L11.6957 29.9998C12.4224 29.9998 13.0166 29.4304 13.0166 28.734L13.0166 2.34704C13.0166 1.05809 11.9125 9.65248e-08 10.5635 2.14461e-07Z" fill="#30CC33"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.1135 2.24641e-07L3.89056 8.56092e-07C2.77038 9.54021e-07 1.79473 0.619468 1.31695 1.51596L13.6831 1.51596C13.2053 0.619467 12.2297 1.27062e-07 11.1135 2.24641e-07Z" fill="#26BA28"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6398 0.100098L4.36839 0.100098C3.39676 0.100098 2.5496 0.677238 2.13204 1.51602L12.8721 1.51602C12.4586 0.677237 11.6114 0.100098 10.6398 0.100098Z" fill="#30CC33"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.2423 1.55495e-07L4.76182 6.34612e-07C3.77815 7.20607e-07 2.97515 0.769524 2.97515 1.71219L2.97515 6.7795C2.97515 7.28738 3.40877 7.69908 3.93473 7.69908L11.0613 7.69908C11.5913 7.69908 12.0209 7.28354 12.0209 6.7795L12.0209 1.71219C12.0249 0.769523 11.2219 6.98507e-08 10.2423 1.55495e-07Z" fill="#26BA28"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6116 6.28289e-08L7.52004 3.331e-07L7.48391 3.36259e-07L4.39237 6.0653e-07L3.67368 7.69908L7.48391 7.69908L7.52004 7.69908L11.3303 7.69908L10.6116 6.28289e-08Z" fill="#30CC33"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M14.4138 5.17871L13.0166 5.17871L13.0166 6.30221L14.4138 6.30221C14.735 6.30221 15 6.04827 15 5.74046C15 5.43265 14.735 5.17871 14.4138 5.17871Z" fill="#0A9E0E"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5862 5.16699L1.98743 5.16699L1.98743 6.29049L0.586201 6.29049C0.265002 6.29049 8.57527e-06 6.03655 8.54836e-06 5.72874C8.52145e-06 5.42093 0.265002 5.16699 0.5862 5.16699Z" fill="#0A9E0E"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0166 6.02539L13.0166 6.30242L14.4138 6.30242C14.6266 6.30242 14.8153 6.19084 14.9156 6.02539L13.0166 6.02539Z" fill="#26BA28"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.98743 6.01758L1.98743 6.29461L0.5862 6.29461C0.373406 6.29461 0.184698 6.18303 0.0803082 6.01758L1.98743 6.01758Z" fill="#26BA28"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M3.95475 6.21272e-07C3.95074 0.0192387 3.95074 0.0384768 3.95074 0.0577148C3.95074 0.219315 4.0752 0.350137 4.22375 0.350137L10.7883 0.350137C10.9368 0.350137 11.0613 0.219314 11.0613 0.0577142C11.0613 0.0384761 11.0613 0.0192381 11.0573 3.50487e-10L3.95475 6.21272e-07Z" fill="#0A9E0E"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9767 13.5093C11.8643 13.5093 11.7679 13.5978 11.7679 13.7094L11.7679 28.8613C11.7679 28.969 11.8603 29.0613 11.9767 29.0613C12.0931 29.0613 12.1855 28.9728 12.1855 28.8613L12.1855 13.7094C12.1815 13.5978 12.0891 13.5093 11.9767 13.5093Z" fill="#213058"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M3.03938 13.5132C2.92696 13.5132 2.8306 13.6017 2.8306 13.7133L2.83061 28.8652C2.83061 28.9729 2.92295 29.0652 3.03938 29.0652C3.1518 29.0652 3.24817 28.9767 3.24817 28.8652L3.24817 13.7133C3.24817 13.6017 3.1518 13.5132 3.03938 13.5132Z" fill="#213058"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.84477 15.3945C9.76045 15.3945 9.6922 15.4599 9.6922 15.5407L9.69221 26.795C9.69221 26.8758 9.76045 26.9412 9.84477 26.9412C9.92908 26.9412 9.99734 26.8758 9.99734 26.795L9.99734 15.5407C10.0014 15.4599 9.92908 15.3945 9.84477 15.3945Z" fill="#0A9E0E"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.33512 15.3945C8.25081 15.3945 8.18255 15.4599 8.18255 15.5407L8.18255 26.795C8.18255 26.8758 8.25081 26.9412 8.33512 26.9412C8.41944 26.9412 8.4877 26.8758 8.4877 26.795L8.48769 15.5407C8.49171 15.4599 8.41944 15.3945 8.33512 15.3945Z" fill="#0A9E0E"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M6.82548 15.3945C6.74116 15.3945 6.67291 15.4599 6.67291 15.5407L6.67291 26.795C6.67291 26.8758 6.74117 26.9412 6.82548 26.9412C6.9098 26.9412 6.97805 26.8758 6.97805 26.795L6.97805 15.5407C6.98207 15.4599 6.90979 15.3945 6.82548 15.3945Z" fill="#0A9E0E"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.31578 15.3945C5.23147 15.3945 5.16321 15.4599 5.16321 15.5407L5.16321 26.795C5.16321 26.8758 5.23147 26.9412 5.31579 26.9412C5.4001 26.9412 5.46835 26.8758 5.46835 26.795L5.46835 15.5407C5.47236 15.4599 5.4001 15.3945 5.31578 15.3945Z" fill="#0A9E0E"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9446 5.217C9.53561 4.1666 5.46842 4.1666 3.05943 5.217C2.27651 5.55944 2.32068 6.02885 2.40901 6.73681C2.54953 7.85646 2.69006 8.97611 2.83058 10.0958C5.94621 9.19928 9.05782 9.16849 12.1735 10.0958C12.314 8.97611 12.4545 7.85646 12.595 6.73681C12.6834 6.02884 12.7275 5.55944 11.9446 5.217Z" fill="#213058"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.37695 6.47141C5.19146 5.1863 9.78862 5.17476 12.6272 6.44447C12.6794 5.89426 12.6112 5.5095 11.9407 5.21708C10.7362 4.68996 9.12615 4.42832 7.51614 4.43217L7.48001 4.43217C5.87 4.43217 4.25999 4.69381 3.05549 5.21709C2.38097 5.51335 2.32074 5.90966 2.37695 6.47141Z" fill="#18284F"/>
      <path d="M3.46092 12.9741L11.5431 12.9741L11.5431 13.2011L3.46092 13.2011L3.46092 12.9741Z" fill="#0A9E0E"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3263 29.4922L10.4871 29.4922C10.3426 29.4922 10.2221 29.6076 10.2221 29.7461L10.2221 30.0001L11.5872 30.0001L11.5872 29.7461C11.5913 29.6076 11.4708 29.4922 11.3263 29.4922Z" fill="#213058"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.87827 29.4922L4.03914 29.4922C3.8946 29.4922 3.77415 29.6076 3.77415 29.7461L3.77415 30.0001L5.13925 30.0001L5.13925 29.7461C5.14326 29.6038 5.02281 29.4922 4.87827 29.4922Z" fill="#213058"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0166 6.42969L12.4224 10.108L12.4264 13.0283L13.0166 13.0283L13.0166 6.42969Z" fill="#213058"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.98744 6.42969L2.58167 10.108L2.57765 13.0283L1.98745 13.0283L1.98744 6.42969Z" fill="#213058"/>
      </svg>`,
      };
    case 'Free':
      return {
        icon: `<svg style="{ transform: 'rotate(${rotate}deg)'}" xmlns="http://www.w3.org/2000/svg" width="15" height="30" viewBox="0 0 15 30" fill="none">
      <g clip-path="url(#clip0_1820_98729)">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.889 0.00976586L4.11627 0.00976645C2.62544 0.00976658 1.40944 1.25592 1.40944 2.77515L1.40944 28.5059C1.40944 29.3252 2.0645 29.9944 2.86638 29.9944L12.1351 29.9944C12.937 29.9944 13.592 29.3251 13.592 28.5059L13.592 2.77515C13.5958 1.25592 12.376 0.00976573 10.889 0.00976586Z" fill="#16128D"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3732 0.00976583L4.62826 0.00976633C3.36332 0.00976644 2.33179 1.06746 2.33179 2.35592L2.33179 28.7328C2.33179 29.429 2.88897 29.9982 3.57038 29.9982L11.4348 29.9982C12.1163 29.9982 12.6734 29.429 12.6734 28.7328L12.6734 2.35592C12.6734 1.06746 11.6381 0.00976572 10.3732 0.00976583Z" fill="#2F54EB"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.889 0.00976584L4.11625 0.00976643C3.0659 0.00976652 2.15107 0.628998 1.70307 1.52515L13.2984 1.52515C12.8504 0.628997 11.9355 0.00976574 10.889 0.00976584Z" fill="#153E6D"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.69956 15.3984C9.6205 15.3984 9.55651 15.4638 9.55651 15.5446L9.55651 26.7946C9.55651 26.8754 9.62051 26.9407 9.69956 26.9407C9.77862 26.9407 9.84262 26.8754 9.84262 26.7946L9.84262 15.5446C9.84639 15.4638 9.77862 15.3984 9.69956 15.3984Z" fill="#0A9E0E"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.28452 15.3984C8.20547 15.3984 8.14146 15.4638 8.14146 15.5446L8.14146 26.7946C8.14146 26.8754 8.20547 26.9407 8.28452 26.9407C8.36358 26.9407 8.42759 26.8754 8.42759 26.7946L8.42758 15.5446C8.43135 15.4638 8.36358 15.3984 8.28452 15.3984Z" fill="#0A9E0E"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M6.86948 15.3984C6.79043 15.3984 6.72642 15.4638 6.72642 15.5446L6.72643 26.7946C6.72643 26.8754 6.79043 26.9407 6.86949 26.9407C6.94854 26.9407 7.01255 26.8754 7.01255 26.7946L7.01255 15.5446C7.01631 15.4638 6.94854 15.3984 6.86948 15.3984Z" fill="#0A9E0E"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.45153 15.3984C5.37247 15.3984 5.30846 15.4638 5.30846 15.5446L5.30847 26.7946C5.30847 26.8754 5.37247 26.9407 5.45153 26.9407C5.53059 26.9407 5.59458 26.8754 5.59458 26.7946L5.59458 15.5446C5.59834 15.4638 5.53058 15.3984 5.45153 15.3984Z" fill="#0A9E0E"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4447 0.109863L4.56425 0.109864C3.65319 0.109864 2.85884 0.686784 2.46731 1.52525L12.5379 1.52524C12.1501 0.686784 11.3558 0.109863 10.4447 0.109863Z" fill="#2F54EB"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.072 0.00976577L4.9332 0.00976622C4.01085 0.0097663 3.25791 0.778997 3.25791 1.7213L3.25791 6.78669C3.25791 7.29438 3.66449 7.70592 4.15767 7.70592L10.84 7.70592C11.337 7.70592 11.7398 7.29054 11.7398 6.78669L11.7398 1.7213C11.7436 0.778996 10.9906 0.00976569 10.072 0.00976577Z" fill="#16128D"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4184 0.00976568L7.51955 0.00976594L7.48567 0.00976594L4.58685 0.00976619L3.91296 7.70592L7.48567 7.70592L7.51955 7.70592L11.0923 7.70592L10.4184 0.00976568Z" fill="#2F54EB"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9836 5.18652L12.6734 5.18652L12.6734 6.3096L13.9836 6.3096C14.2847 6.3096 14.5332 6.05575 14.5332 5.74806C14.5332 5.44037 14.2847 5.18652 13.9836 5.18652Z" fill="#2F54EB"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.01791 5.17529L2.33179 5.17529L2.33179 6.29837L1.01791 6.29837C0.716732 6.29837 0.468257 6.04452 0.468257 5.73683C0.468257 5.42914 0.716732 5.17529 1.01791 5.17529Z" fill="#2F54EB"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.6734 6.03271L12.6734 6.30964L13.9835 6.30964C14.1831 6.30964 14.36 6.1981 14.4541 6.03271L12.6734 6.03271Z" fill="#16128D"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.33179 6.02539L2.33179 6.30232L1.01791 6.30232C0.818379 6.30232 0.641434 6.19078 0.543552 6.02539L2.33179 6.02539Z" fill="#16128D"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.1765 0.00976621C4.17273 0.028997 4.17274 0.0482277 4.17274 0.0674585C4.17274 0.228997 4.28944 0.35977 4.42873 0.35977L10.584 0.359769C10.7233 0.359769 10.84 0.228996 10.84 0.0674579C10.84 0.0482272 10.84 0.0289964 10.8363 0.00976563L4.1765 0.00976621Z" fill="#2F54EB"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6984 13.5137C11.593 13.5137 11.5026 13.6021 11.5026 13.7137L11.5026 28.8598C11.5026 28.9675 11.5892 29.0598 11.6984 29.0598C11.8075 29.0598 11.8941 28.9714 11.8941 28.8598L11.8941 13.7137C11.8904 13.6021 11.8038 13.5137 11.6984 13.5137Z" fill="#211CA7"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M3.31814 13.5176C3.21273 13.5176 3.12238 13.606 3.12238 13.7176L3.12238 28.8637C3.12238 28.9714 3.20897 29.0637 3.31815 29.0637C3.42356 29.0637 3.51392 28.9753 3.51392 28.8637L3.51392 13.7176C3.51392 13.606 3.42356 13.5176 3.31814 13.5176Z" fill="#211CA7"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.69932 15.3984C9.62026 15.3984 9.55627 15.4638 9.55627 15.5446L9.55627 26.7946C9.55627 26.8754 9.62026 26.9407 9.69932 26.9407C9.77838 26.9407 9.84238 26.8754 9.84238 26.7946L9.84238 15.5446C9.84614 15.4638 9.77838 15.3984 9.69932 15.3984Z" fill="#211CA7"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.28379 15.3984C8.20473 15.3984 8.14073 15.4638 8.14073 15.5446L8.14073 26.7946C8.14073 26.8754 8.20473 26.9407 8.28379 26.9407C8.36285 26.9407 8.42685 26.8754 8.42685 26.7946L8.42685 15.5446C8.43062 15.4638 8.36285 15.3984 8.28379 15.3984Z" fill="#211CA7"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M6.86826 15.3984C6.78921 15.3984 6.7252 15.4638 6.7252 15.5446L6.7252 26.7946C6.7252 26.8754 6.78921 26.9407 6.86827 26.9407C6.94732 26.9407 7.01133 26.8754 7.01133 26.7946L7.01132 15.5446C7.01509 15.4638 6.94732 15.3984 6.86826 15.3984Z" fill="#211CA7"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.45275 15.3984C5.37369 15.3984 5.30969 15.4638 5.30969 15.5446L5.30969 26.7946C5.30969 26.8754 5.37369 26.9407 5.45275 26.9407C5.53181 26.9407 5.5958 26.8754 5.5958 26.7946L5.5958 15.5446C5.59956 15.4638 5.5318 15.3984 5.45275 15.3984Z" fill="#211CA7"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6683 5.225C9.40943 4.175 5.59578 4.175 3.33696 5.225C2.60284 5.56731 2.64426 6.03654 2.72708 6.74423C2.85884 7.86346 2.99061 8.98269 3.12237 10.1019C6.04379 9.20577 8.96143 9.175 11.8828 10.1019C12.0146 8.98269 12.1464 7.86346 12.2781 6.74423C12.361 6.03654 12.4024 5.56731 11.6683 5.225Z" fill="#302E69"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.69696 6.47893C5.33602 5.19432 9.64661 5.18278 12.3083 6.45201C12.3572 5.90201 12.2932 5.5174 11.6645 5.22509C10.5351 4.69816 9.02543 4.43663 7.51578 4.44047L7.4819 4.44047C5.97225 4.44047 4.46261 4.70201 3.3332 5.22509C2.70073 5.52124 2.64425 5.9174 2.69696 6.47893Z" fill="#232260"/>
      <path d="M3.71342 12.979L11.2918 12.979L11.2918 13.2059L3.71342 13.2059L3.71342 12.979Z" fill="#211CA7"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0885 29.4907L10.3017 29.4907C10.1661 29.4907 10.0532 29.6061 10.0532 29.7446L10.0532 29.9984L11.3332 29.9984L11.3332 29.7446C11.337 29.6061 11.224 29.4907 11.0885 29.4907Z" fill="#211CA7"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.04237 29.4907L4.25555 29.4907C4.12002 29.4907 4.00708 29.6061 4.00708 29.7446L4.00708 29.9984L5.28708 29.9984L5.28708 29.7446C5.29084 29.6023 5.1779 29.4907 5.04237 29.4907Z" fill="#211CA7"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.6734 6.43652L12.1163 10.1134L12.12 13.0327L12.6734 13.0327L12.6734 6.43652Z" fill="#211CA7"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.3318 6.43652L2.88898 10.1134L2.88521 13.0327L2.3318 13.0327L2.3318 6.43652Z" fill="#211CA7"/>
      </g>
      <defs>
      <clipPath id="clip0_1820_98729">
      <rect width="15" height="30" fill="white" transform="matrix(-1 8.74228e-08 8.74228e-08 1 15 0)"/>
      </clipPath>
      </defs>
      </svg>`,
      };
    default:
      return {
        icon: `<svg style="{ transform: 'rotate(${rotate}deg)'}" xmlns="http://www.w3.org/2000/svg" width="15" height="30" viewBox="0 0 15 30" fill="none">
      <g clip-path="url(#clip0_1820_98729)">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.889 0.00976586L4.11627 0.00976645C2.62544 0.00976658 1.40944 1.25592 1.40944 2.77515L1.40944 28.5059C1.40944 29.3252 2.0645 29.9944 2.86638 29.9944L12.1351 29.9944C12.937 29.9944 13.592 29.3251 13.592 28.5059L13.592 2.77515C13.5958 1.25592 12.376 0.00976573 10.889 0.00976586Z" fill="#16128D"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3732 0.00976583L4.62826 0.00976633C3.36332 0.00976644 2.33179 1.06746 2.33179 2.35592L2.33179 28.7328C2.33179 29.429 2.88897 29.9982 3.57038 29.9982L11.4348 29.9982C12.1163 29.9982 12.6734 29.429 12.6734 28.7328L12.6734 2.35592C12.6734 1.06746 11.6381 0.00976572 10.3732 0.00976583Z" fill="#2F54EB"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.889 0.00976584L4.11625 0.00976643C3.0659 0.00976652 2.15107 0.628998 1.70307 1.52515L13.2984 1.52515C12.8504 0.628997 11.9355 0.00976574 10.889 0.00976584Z" fill="#153E6D"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.69956 15.3984C9.6205 15.3984 9.55651 15.4638 9.55651 15.5446L9.55651 26.7946C9.55651 26.8754 9.62051 26.9407 9.69956 26.9407C9.77862 26.9407 9.84262 26.8754 9.84262 26.7946L9.84262 15.5446C9.84639 15.4638 9.77862 15.3984 9.69956 15.3984Z" fill="#0A9E0E"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.28452 15.3984C8.20547 15.3984 8.14146 15.4638 8.14146 15.5446L8.14146 26.7946C8.14146 26.8754 8.20547 26.9407 8.28452 26.9407C8.36358 26.9407 8.42759 26.8754 8.42759 26.7946L8.42758 15.5446C8.43135 15.4638 8.36358 15.3984 8.28452 15.3984Z" fill="#0A9E0E"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M6.86948 15.3984C6.79043 15.3984 6.72642 15.4638 6.72642 15.5446L6.72643 26.7946C6.72643 26.8754 6.79043 26.9407 6.86949 26.9407C6.94854 26.9407 7.01255 26.8754 7.01255 26.7946L7.01255 15.5446C7.01631 15.4638 6.94854 15.3984 6.86948 15.3984Z" fill="#0A9E0E"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.45153 15.3984C5.37247 15.3984 5.30846 15.4638 5.30846 15.5446L5.30847 26.7946C5.30847 26.8754 5.37247 26.9407 5.45153 26.9407C5.53059 26.9407 5.59458 26.8754 5.59458 26.7946L5.59458 15.5446C5.59834 15.4638 5.53058 15.3984 5.45153 15.3984Z" fill="#0A9E0E"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4447 0.109863L4.56425 0.109864C3.65319 0.109864 2.85884 0.686784 2.46731 1.52525L12.5379 1.52524C12.1501 0.686784 11.3558 0.109863 10.4447 0.109863Z" fill="#2F54EB"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.072 0.00976577L4.9332 0.00976622C4.01085 0.0097663 3.25791 0.778997 3.25791 1.7213L3.25791 6.78669C3.25791 7.29438 3.66449 7.70592 4.15767 7.70592L10.84 7.70592C11.337 7.70592 11.7398 7.29054 11.7398 6.78669L11.7398 1.7213C11.7436 0.778996 10.9906 0.00976569 10.072 0.00976577Z" fill="#16128D"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4184 0.00976568L7.51955 0.00976594L7.48567 0.00976594L4.58685 0.00976619L3.91296 7.70592L7.48567 7.70592L7.51955 7.70592L11.0923 7.70592L10.4184 0.00976568Z" fill="#2F54EB"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9836 5.18652L12.6734 5.18652L12.6734 6.3096L13.9836 6.3096C14.2847 6.3096 14.5332 6.05575 14.5332 5.74806C14.5332 5.44037 14.2847 5.18652 13.9836 5.18652Z" fill="#2F54EB"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.01791 5.17529L2.33179 5.17529L2.33179 6.29837L1.01791 6.29837C0.716732 6.29837 0.468257 6.04452 0.468257 5.73683C0.468257 5.42914 0.716732 5.17529 1.01791 5.17529Z" fill="#2F54EB"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.6734 6.03271L12.6734 6.30964L13.9835 6.30964C14.1831 6.30964 14.36 6.1981 14.4541 6.03271L12.6734 6.03271Z" fill="#16128D"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.33179 6.02539L2.33179 6.30232L1.01791 6.30232C0.818379 6.30232 0.641434 6.19078 0.543552 6.02539L2.33179 6.02539Z" fill="#16128D"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.1765 0.00976621C4.17273 0.028997 4.17274 0.0482277 4.17274 0.0674585C4.17274 0.228997 4.28944 0.35977 4.42873 0.35977L10.584 0.359769C10.7233 0.359769 10.84 0.228996 10.84 0.0674579C10.84 0.0482272 10.84 0.0289964 10.8363 0.00976563L4.1765 0.00976621Z" fill="#2F54EB"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6984 13.5137C11.593 13.5137 11.5026 13.6021 11.5026 13.7137L11.5026 28.8598C11.5026 28.9675 11.5892 29.0598 11.6984 29.0598C11.8075 29.0598 11.8941 28.9714 11.8941 28.8598L11.8941 13.7137C11.8904 13.6021 11.8038 13.5137 11.6984 13.5137Z" fill="#211CA7"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M3.31814 13.5176C3.21273 13.5176 3.12238 13.606 3.12238 13.7176L3.12238 28.8637C3.12238 28.9714 3.20897 29.0637 3.31815 29.0637C3.42356 29.0637 3.51392 28.9753 3.51392 28.8637L3.51392 13.7176C3.51392 13.606 3.42356 13.5176 3.31814 13.5176Z" fill="#211CA7"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.69932 15.3984C9.62026 15.3984 9.55627 15.4638 9.55627 15.5446L9.55627 26.7946C9.55627 26.8754 9.62026 26.9407 9.69932 26.9407C9.77838 26.9407 9.84238 26.8754 9.84238 26.7946L9.84238 15.5446C9.84614 15.4638 9.77838 15.3984 9.69932 15.3984Z" fill="#211CA7"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.28379 15.3984C8.20473 15.3984 8.14073 15.4638 8.14073 15.5446L8.14073 26.7946C8.14073 26.8754 8.20473 26.9407 8.28379 26.9407C8.36285 26.9407 8.42685 26.8754 8.42685 26.7946L8.42685 15.5446C8.43062 15.4638 8.36285 15.3984 8.28379 15.3984Z" fill="#211CA7"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M6.86826 15.3984C6.78921 15.3984 6.7252 15.4638 6.7252 15.5446L6.7252 26.7946C6.7252 26.8754 6.78921 26.9407 6.86827 26.9407C6.94732 26.9407 7.01133 26.8754 7.01133 26.7946L7.01132 15.5446C7.01509 15.4638 6.94732 15.3984 6.86826 15.3984Z" fill="#211CA7"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.45275 15.3984C5.37369 15.3984 5.30969 15.4638 5.30969 15.5446L5.30969 26.7946C5.30969 26.8754 5.37369 26.9407 5.45275 26.9407C5.53181 26.9407 5.5958 26.8754 5.5958 26.7946L5.5958 15.5446C5.59956 15.4638 5.5318 15.3984 5.45275 15.3984Z" fill="#211CA7"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6683 5.225C9.40943 4.175 5.59578 4.175 3.33696 5.225C2.60284 5.56731 2.64426 6.03654 2.72708 6.74423C2.85884 7.86346 2.99061 8.98269 3.12237 10.1019C6.04379 9.20577 8.96143 9.175 11.8828 10.1019C12.0146 8.98269 12.1464 7.86346 12.2781 6.74423C12.361 6.03654 12.4024 5.56731 11.6683 5.225Z" fill="#302E69"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.69696 6.47893C5.33602 5.19432 9.64661 5.18278 12.3083 6.45201C12.3572 5.90201 12.2932 5.5174 11.6645 5.22509C10.5351 4.69816 9.02543 4.43663 7.51578 4.44047L7.4819 4.44047C5.97225 4.44047 4.46261 4.70201 3.3332 5.22509C2.70073 5.52124 2.64425 5.9174 2.69696 6.47893Z" fill="#232260"/>
      <path d="M3.71342 12.979L11.2918 12.979L11.2918 13.2059L3.71342 13.2059L3.71342 12.979Z" fill="#211CA7"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0885 29.4907L10.3017 29.4907C10.1661 29.4907 10.0532 29.6061 10.0532 29.7446L10.0532 29.9984L11.3332 29.9984L11.3332 29.7446C11.337 29.6061 11.224 29.4907 11.0885 29.4907Z" fill="#211CA7"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.04237 29.4907L4.25555 29.4907C4.12002 29.4907 4.00708 29.6061 4.00708 29.7446L4.00708 29.9984L5.28708 29.9984L5.28708 29.7446C5.29084 29.6023 5.1779 29.4907 5.04237 29.4907Z" fill="#211CA7"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.6734 6.43652L12.1163 10.1134L12.12 13.0327L12.6734 13.0327L12.6734 6.43652Z" fill="#211CA7"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.3318 6.43652L2.88898 10.1134L2.88521 13.0327L2.3318 13.0327L2.3318 6.43652Z" fill="#211CA7"/>
      </g>
      <defs>
      <clipPath id="clip0_1820_98729">
      <rect width="15" height="30" fill="white" transform="matrix(-1 8.74228e-08 8.74228e-08 1 15 0)"/>
      </clipPath>
      </defs>
      </svg>`,
      };
  }
};