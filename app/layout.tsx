'use client'

import * as React from 'react'
import { PropsWithChildren } from "react";
import { ClientProviderList } from './ClientProviderList';
import { Nunito_Sans } from 'next/font/google';

const font = Nunito_Sans({
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap'
})


export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <title>Ứng dụng gọi món bằng menu điện tử</title>
        <meta name='description' content='Ứng dụng gọi món bằng menu điện tử' />
        <link rel="icon" href="https://nethue.com.vn/uploaded/tin-tuc-loigioithieu-1.png" />
      </head>
      <body className={font.className} suppressHydrationWarning>
        <ClientProviderList>
          {children}
        </ClientProviderList>
      </body>
    </html>
  );
}