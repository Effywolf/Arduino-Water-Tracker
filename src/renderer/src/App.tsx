import '@fontsource/inter'
import Button from '@mui/joy/Button'
import { Avatar, Divider, Grid, Stack, Typography } from '@mui/joy'
import { Sheet } from '@mui/joy'
import { CssVarsProvider } from '@mui/joy/styles'
import './components/App.css'

function App(): JSX.Element {
  const handleButtonClick = (face: number) => {
    return () => {
      window.api.write(`${face}`)
    }
  }

  return (
    <CssVarsProvider defaultMode="dark">
      <Sheet variant="plain">
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
                <Avatar src="https://cdn.discordapp.com/attachments/894682213831016529/1175140200259780608/IMG_1558.png?ex=656a2598&is=6557b098&hm=92ac96a8227a0742bdb1a3fabecd0e9627d56a5ebc1b1ad982e671f2cf7fc9f6&" />
                <Typography level="h3">{'Effy'}</Typography>
              </Stack>
            </div>
          </Stack>
        </Sheet>
        <Grid container spacing={2} sx={{ marginTop: '20px' }}>
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
          <Grid xs={7}>
            <Sheet sx={{ padding: '20px' }} variant="soft" color="primary">
              <Stack direction={'column'} spacing={2}>
                <Sheet
                  variant="soft"
                  color="primary"
                  sx={{
                    display: 'flex',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography level="h2">"{'quote body'}"</Typography>
                </Sheet>
                <Typography level="body-lg">- {'quote author'}</Typography>
              </Stack>
            </Sheet>
          </Grid>
        </Grid>
      </Sheet>
    </CssVarsProvider>
  )
}

export default App
