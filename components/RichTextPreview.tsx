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
      h1: ({children}: any) => <h1 style={{color: '#000', fontSize: '2.5em', fontWeight: '900', margin: '1em 0'}}>{children}</h1>,
      h2: ({children}: any) => <h2 style={{color: '#000', fontSize: '2em', fontWeight: '800', margin: '1em 0'}}>{children}</h2>,
      h3: ({children}: any) => <h3 style={{color: '#000', fontSize: '1.5em', fontWeight: '700', margin: '1em 0'}}>{children}</h3>,
      
      normal: ({ children, value: node }: any) => {
        const text = node.children.map((c: any) => c.text).join('')
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
        return <p style={{ marginBottom: '1.2em', lineHeight: '1.8', color: '#000', fontSize: '18px', fontWeight: '500' }}>{children}</p>
      },
    },
    types: {
      image: ({ value }: any) => (
        <div style={{ margin: '2.5rem 0' }}>
          <img 
            src={value.asset?._ref ? `https://cdn.sanity.io/images/6ocswb4i/production/${value.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}` : ''} 
            style={{ width: '100%', display: 'block' }} 
          />
        </div>
      ),
      affiliateButton: ({ value }: any) => {
        const store = value.storeId || 'amazon'
        const isAli = store === 'aliexpress'
        
        return (
          <div style={{ 
            display: 'inline-flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            width: '180px',          // Lebar tombol
            marginRight: '25px',     // Jarak antar tombol agar TIDAK MENYATU
            marginBottom: '25px',    // Jarak bawah
            verticalAlign: 'top'
          }}>
            {/* LOGO AREA (DI ATAS TOMBOL) */}
            <div style={{ height: '35px', display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              {isAli ? (
                <div style={{ display: 'flex', alignItems: 'center', fontWeight: '900', fontFamily: 'sans-serif' }}>
                   <span style={{ backgroundColor: '#E62E04', color: 'white', padding: '2px 6px', borderRadius: '4px', marginRight: '4px', fontSize: '14px' }}>Ali</span>
                   <span style={{ color: '#E62E04', fontSize: '16px' }}>Express</span>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                   <span style={{ color: 'black', fontWeight: '900', fontSize: '18px', fontFamily: 'sans-serif' }}>amazon</span>
                   <div style={{ width: '45px', height: '4px', borderBottom: '2.5px solid #FF9900', borderRadius: '50%', marginTop: '-6px' }}></div>
                </div>
              )}
            </div>

            {/* TOMBOL AREA */}
            <div style={{ 
              width: '100%',
              backgroundColor: isAli ? '#E62E04' : '#FF9900', 
              color: isAli ? '#fff' : '#000', 
              padding: '12px 5px', 
              fontWeight: '900', 
              fontSize: '11px', 
              textAlign: 'center',
              borderRadius: '6px',
              textTransform: 'uppercase',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              {value.label || 'CHECK PRICE'}
            </div>
          </div>
        )
      }
    }
  }

  return (
    <Stack space={2}>
      <Flex justify="flex-end" gap={2} paddingBottom={2}>
        <Button fontSize={1} padding={2} text="WRITE" mode={mode === 'write' ? 'default' : 'ghost'} radius={0} onClick={() => setMode('write')} />
        <Button fontSize={1} padding={2} text="PREVIEW" mode={mode === 'preview' ? 'default' : 'ghost'} tone="primary" radius={0} onClick={() => setMode('preview')} />
      </Flex>

      <Card radius={0} border style={{ backgroundColor: '#fff' }}>
        {mode === 'write' ? (
          <Box padding={1}>{renderDefault(props)}</Box>
        ) : (
          <Box padding={5} style={{ minHeight: '600px', backgroundColor: '#fff' }}>
              <div style={{ borderBottom: '3px solid #4a3728', marginBottom: '2em', paddingBottom: '10px' }}>
                <Text size={3} weight="black" style={{ color: '#000' }}>📖 ZAIDLY EDITORIAL PREVIEW</Text>
              </div>
              <div style={{ color: '#000' }}>
                {value && value.length > 0 ? (
                  <PortableText value={value} components={myComponents} />
                ) : (
                  <Text muted italic>Empty content...</Text>
                )}
              </div>
          </Box>
        )}
      </Card>
    </Stack>
  )
}