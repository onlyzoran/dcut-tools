import type { Slide } from './types.ts'

export const initialSlides: Slide[] = [
    {
        id: '1',
        sku: 'DBRJ1530',
        title: 'Перфоратор DBRJ1530',
        annotation: 'Бесщеточный инструмент для тяжёлых задач. Объект: ЖК Селигер Сити.',
        isChecked: true,
    },
    {
        id: '2',
        sku: 'DCF01521',
        title: 'Дрель-шуруповёрт DCF01521',
        annotation: 'Аккумуляторная модель для ежедневной работы. Объект: Пресня Сити.',
        isChecked: true,
    },
    {
        id: '3',
        sku: 'DBG12525V',
        title: 'УШМ DBG12525V',
        annotation: 'Угловая шлифмашина с ресурсом в 3 раза выше аналогов.',
        isChecked: false,
    },
    {
        id: '4',
        sku: 'DCW18021',
        title: 'Гайковёрт DCW18021',
        annotation: 'На сервисном обслуживании. Гарантия: ремонт за 24 часа.',
        isChecked: false,
    },
    {
        id: '5',
        sku: 'DCS55021',
        title: 'Циркулярная пила DCS55021',
        annotation: 'Распил бетона и металла на объекте. Объект: ФСК Amber City.',
        isChecked: true,
    },
]
