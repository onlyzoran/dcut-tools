export const getSlideStatusLabel = (isChecked: boolean): string => {
    return isChecked ? 'На объекте' : 'На складе'
}

export const getSlideStatusColor = (isChecked: boolean): string => {
    return isChecked ? 'green' : 'gray'
}
