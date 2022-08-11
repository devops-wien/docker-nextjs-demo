import { useEffect, useState } from 'react'
import { useCountdown } from 'react-countdown-circle-timer'

import Greeting from '@/components/Greeting'
import ImageLink from '@/components/ImageLink/ImageLink'

const gitRawMediaUrl = 'https://raw.githubusercontent.com/devops-wien/devops-wien-assets/main/images/'
const zone = process.env.NEXT_PUBLIC_ZONE ? process.env.NEXT_PUBLIC_ZONE : 'local'
const env_name = process.env.NEXT_PUBLIC_ENV_NAME ? process.env.NEXT_PUBLIC_ENV_NAME : 'dev'

const zones = ['at-vie-1', 'bg-sof-1', 'ch-dk-2', 'ch-gva-2', 'de-fra-1', 'de-muc-1']

export default function IndexPage() {
  const [city] = useState(zone)
  const [country] = useState(setFlag(zone))
  const { remainingTime } = useCountdown({ isPlaying: true, duration: 10, colors: '#35a627' })

  useEffect(() => {
    setTimeout(async () => {
      location.href = await getAvailableUrlFromDifferentZone(city)
    }, 9000)
  }, [city])

  return (
    <div>
      <div className="py-20">
        <Greeting target={city + ',' + country} />
        <div className="mx-auto text-center">Site performs refresh in {remainingTime} seconds</div>

        <div className="grid grid-cols-3 relative h-full w-full gap-8 p-8">
          <ImageLink
            imageSrc={gitRawMediaUrl + 'exoscale_event_small.png'}
            href={'https://events.exoscale.com/exoscale-acceler8-vienna'}
          />
          <ImageLink
            imageSrc={gitRawMediaUrl + 'dockerhub_image_small.png'}
            href={'https://hub.docker.com/r/devopswien/docker-nextjs-demo'}
          />
          <ImageLink
            imageSrc={gitRawMediaUrl + 'terraform_registries_small.png'}
            href={'https://registry.terraform.io/search/modules?q=devops.wien'}
          />
          <ImageLink
            imageSrc={gitRawMediaUrl + 'terraform_workspaces_small.png'}
            href={'https://app.terraform.io/app/DEV-devops-wien/workspaces/'}
          />
          <ImageLink imageSrc={gitRawMediaUrl + 'git_repo_small.png'} href={'https://github.com/devops-wien'} />
          <ImageLink
            imageSrc={gitRawMediaUrl + 'postman_flows_small.png'}
            href={
              'https://devops-vienna.postman.co/workspace/devops.wien---Team-Workspace~1da23a1d-340c-48cd-88e2-79c5d84e8198/overview'
            }
          />
          <ImageLink
            imageSrc={gitRawMediaUrl + 'slack_notifications_small.png'}
            href={'https://devopswien.slack.com/'}
          />
          <ImageLink
            imageSrc={gitRawMediaUrl + 'jira_github_integration_small.png'}
            href={'https://devops-wien.atlassian.net/'}
          />
          <ImageLink
            imageSrc={gitRawMediaUrl + 'cloudflare_dns_integration_small.png'}
            href={'https://dash.cloudflare.com/91b3d10a2c41e59647e3ffbec053d628/devops.wien/dns'}
          />
          <ImageLink
            imageSrc={gitRawMediaUrl + 'exoscale_sks_instances_small.png'}
            href={'https://portal.exoscale.com/u/dev-devopswien/compute/instances'}
          />
        </div>
      </div>
    </div>
  )
}

function getUrlFromZone(zone: string) {
  return 'https://nextjs-' + zone + '-' + env_name + '.devops.wien'
}

async function zoneIsAvailable(zone: string) {
  return await fetch(getUrlFromZone(zone))
    .then((res) => res.ok)
    .catch(() => false)
}

async function getAvailableUrlFromDifferentZone(zone: string) {
  const getRandomNumber = () => Math.floor(Math.random() * zones.length)
  let redirect = zones[getRandomNumber()]
  let i = 0

  while (!(await zoneIsAvailable(redirect)) || (zone == redirect && i++ < zones.length))
    redirect = zones[getRandomNumber()]

  return getUrlFromZone(redirect)
}

function setFlag(city: string) {
  let flag = ''
  switch (city) {
    case 'at-vie-1':
      flag = '🇦🇹'
      break
    case 'at-fra-1':
      flag = '🇩🇪'
      break
    case 'de-muc-1':
      flag = '🇩🇪'
      break
    case 'ch-dk-2':
      flag = '🇨🇭'
      break
    case 'ch-gva-2':
      flag = '🇨🇭'
      break
    case 'bg-sof-1':
      flag = '🇧🇬'
      break
    default:
      return '🏁'
  }
  return flag
}
