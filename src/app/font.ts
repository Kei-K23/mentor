import { Open_Sans, Roboto_Slab } from 'next/font/google'

export const openSans = Open_Sans({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', "800"],
    display: 'auto'
})

export const robotoSlab = Roboto_Slab({
    subsets: ['latin'],
    weight: ["100", "200", '300', '400', '500', '600', '700', "800", "900"],
    display: 'auto'
})

