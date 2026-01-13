/** @jsxImportSource react */
import { Box, Card, Flex, Stack, Text, Button } from '@sanity/ui'
import { PortableText } from '@portabletext/react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useState } from 'react'

export function RichTextPreview(props: any) {
  const { value, renderDefault } = props
  const [mode, setMode] = useState<'write' | 'preview'>('write')

  const myComponents = {
    block: {
      // Maksa Heading jadi Hitam Pekat (Gak Buram)
      h1: ({children}: any) => <h1 style={{color: '#000', fontSize: '2.5em', fontWeight: '900', margin: '1em 0'}}>{children}</h1>,
      h2: ({children}: any) => <h2 style={{color: '#000', fontSize: '2em', fontWeight: '800', margin: '1em 0'}}>{children}</h2>,
      h3: ({children}: any) => <h3 style={{color: '#000', fontSize: '1.5em', fontWeight: '700', margin: '1em 0'}}>{children}</h3>,
      
      normal: ({ children, value: node }: any) => {
        const text = node.children.map((c: any) => c.text).join('')
        
        // Render Tabel Zaidly Style (Kopi Tua)
        if (text.includes('|')) {
          return (
            <div style={{ margin: '2em 0', overflowX: 'auto' }}>
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  table: ({node, ...props}) => <table style={{ width: '100%', borderCollapse: 'collapse' }} {...props} />,
                  thead: ({node, ...props}) => <thead style={{ backgroundColor: '#4a3728' }} {...props} />,
                  th: ({node, ...props}) => <th style={{ padding: '15px', textAlign: 'left', color: '#fff', fontSize: '13px', fontWeight: 'bold' }} {...props} />,
                  td: ({node, ...props}) => <td style={{ borderBottom: '1px solid #eee', padding: '12px', color: '#000', fontWeight: '600' }} {...props} />,
                }}
              >
                {text}
              </ReactMarkdown>
            </div>
          )
        }
        // Teks Artikel Dibuat Hitam Pekat agar Tajam
        return <p style={{ marginBottom: '1.2em', lineHeight: '1.8', color: '#000', fontSize: '18px', fontWeight: '500' }}>{children}</p>
      },
    },
    types: {
      image: ({ value }: any) => (
        <div style={{ margin: '2.5em 0' }}>
          <img 
            src={value.asset?._ref ? `https://cdn.sanity.io/images/6ocswb4i/production/${value.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}` : ''} 
            style={{ width: '100%', display: 'block' }} 
          />
        </div>
      ),
      affiliateButton: ({ value }: any) => (
        <div style={{ margin: '2em 0' }}>
          <Flex gap={3} justify="flex-start" wrap="wrap">
            {/* BUTTON AMAZON GRADIEN MODERN */}
            <div style={{ 
              background: 'linear-gradient(180deg, #FFB338 0%, #FF9900 100%)', 
              color: '#000', padding: '14px 24px', fontWeight: '900', fontSize: '12px', 
              display: 'flex', alignItems: 'center', gap: '8px', border: 'none'
            }}>
               🛒 CHECK PRICE ON AMAZON
            </div>
            {/* BUTTON ALIEXPRESS GRADIEN MODERN */}
            <div style={{ 
              background: 'linear-gradient(180deg, #FF5C38 0%, #E62E04 100%)', 
              color: '#fff', padding: '14px 24px', fontWeight: '900', fontSize: '12px', 
              display: 'flex', alignItems: 'center', gap: '8px', border: 'none'
            }}>
               🚀 CHECK PRICE ON ALIEXPRESS
            </div>
          </Flex>
        </div>
      )
    }
  }

  return (
    <Stack space={2}>
      <Flex justify="flex-end" gap={2} paddingBottom={2}>
        <Button fontSize={1} padding={2} text="TULIS" mode={mode === 'write' ? 'default' : 'ghost'} radius={0} onClick={() => setMode('write')} />
        <Button fontSize={1} padding={2} text="PREVIEW RICH" mode={mode === 'preview' ? 'default' : 'ghost'} tone="primary" radius={0} onClick={() => setMode('preview')} />
      </Flex>

      <Card radius={0} border style={{ backgroundColor: '#fff' }}>
        {mode === 'write' ? (
          <Box padding={1}>{renderDefault(props)}</Box>
        ) : (
          /* Background Putih Bersih dengan Teks Hitam Tajam */
          <Box padding={5} style={{ minHeight: '600px', backgroundColor: '#fff' }}>
             <div style={{ borderBottom: '3px solid #4a3728', marginBottom: '2em', paddingBottom: '10px' }}>
                <Text size={3} weight="black" style={{ color: '#000' }}>📖 ZAIDLY EDITORIAL PREVIEW</Text>
             </div>
             <div style={{ color: '#000' }}>
                {value && value.length > 0 ? (
                  <PortableText value={value} components={myComponents} />
                ) : (
                  <Text muted italic>Belum ada konten...</Text>
                )}
             </div>
          </Box>
        )}
      </Card>
    </Stack>
  )
}