const Converter = (text) => {
    switch(text) {
        case 'gym': return '체육관'
        case 'badminton': return '배트민턴장'
        case 'tenis': return '테니스장'
        case 'health_gym': return '헬스장(체육관)'
        case 'health_dorm': return '헬스장(기숙사)'
        default: return '없음'
    }
}

export default Converter