import '@fontsource/inter'
import Button from '@mui/joy/Button'
import { Avatar, Divider, Grid, Stack, Typography } from '@mui/joy'
import { Sheet } from '@mui/joy'
import { CssVarsProvider } from '@mui/joy/styles'
import './components/App.css'
import cat from './assets/cat.jpg'
import React, { useEffect, useState } from 'react'

function App(): JSX.Element {
  const handleButtonClick = (face: number) => {
    return () => {
      window.api.write(`${face}`)
    }
  }

  const category = 'happiness'
  const url = `https://api.api-ninjas.com/v1/quotes?category=${category}`
  const headers = {
    'X-Api-Key': 'Wt7p8XVIN2uHC7EPGW6D3w==pse0eemaqBIXaGIE',
    'Content-Type': 'application/json'
  }

  let [quotes, setQuotes] = React.useState('')
  let [author, setAuthor] = React.useState('')

  useEffect(() => {
    fetch(url, { method: 'GET', headers: headers }).then(async (response) => {
      const data = await response.json()
      setQuotes(data[0].quote)
      setAuthor(data[0].author)
    })
  }, [])

  return (
    <CssVarsProvider defaultMode="dark">
      <Sheet variant="plain" sx={{ maxWidth: '90%', margin: 'auto', marginTop: '20px' }}>
        <Sheet variant="soft" color="primary">
          <Stack
            direction="row"
            spacing={2}
            alignItems={'center'}
            justifyContent={'space-evenly'}
            divider={<Divider orientation="vertical" />}
            sx={{ margin: '10px', padding: '20px', marginTop: '0px' }}
          >
            <div>
              <Stack
                direction={'column'}
                spacing={1}
                alignContent={'center'}
                gap={2}
                sx={{ alignItems: 'center', paddingRight: '20px' }}
              >
                <Typography level="h1">{'X mL'}</Typography>
                <Typography level="h3">of {'Y'} mL goal</Typography>
              </Stack>
            </div>
            <div>
              <Stack
                direction={'column'}
                spacing={1}
                gap={2}
                sx={{ paddingLeft: '20px', paddingRight: '20px' }}
              >
                <Typography level="h3">Time since last drink: {'X time'}</Typography>
                <Typography level="h3">Streak: {'x time'}</Typography>
              </Stack>
            </div>
            <div>
              <Stack direction={'row'} alignItems={'center'} gap={2} sx={{ paddingLeft: '20px' }}>
                <Avatar src={cat} />
                <Typography level="h3">{'Effy'}</Typography>
              </Stack>
            </div>
          </Stack>
        </Sheet>
        <Grid container spacing={2} sx={{ marginTop: '20px', flexGrow: 1 }}>
          <Grid xs={5}>
            <Sheet sx={{ padding: '20px' }} variant="soft" color="primary">
              <Typography level="h2" sx={{ paddingTop: '0px', paddingBottom: '10px' }}>
                SETTINGS
              </Typography>
              <Divider orientation="horizontal" sx={{ marginTop: '10px', marginBottom: '20px' }} />
              <Stack direction={'column'} spacing={2}>
                <Button>Change Goal</Button>
                <Button>Change Name</Button>
                <Button>Change Picture</Button>
                <Button>Recalibrate</Button>
                <Button>Change Face</Button>
              </Stack>
            </Sheet>
          </Grid>
          <Grid xs={7} sx={{ display: 'flex', flexGrow: 1 }}>
            <Sheet
              sx={{ padding: '20px', display: 'flex', alignItems: 'center' }}
              variant="soft"
              color="primary"
            >
              <Stack direction={'column'} spacing={2}>
                <Sheet
                  variant="soft"
                  color="primary"
                  sx={{
                    display: 'flex',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    justifyItems: 'center'
                  }}
                >
                  <Typography level="h2" sx={{ textAlign: 'center' }}>
                    "{quotes}"
                  </Typography>
                </Sheet>
                <Typography level="body-lg" sx={{ textAlign: 'center' }}>
                  {author}
                </Typography>
              </Stack>
            </Sheet>
          </Grid>
        </Grid>
      </Sheet>
    </CssVarsProvider>
  )
}

export default App
