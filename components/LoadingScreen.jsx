import Image from 'next/image';

export default function Loading() {
  return <Image priority={false} src="/loading.svg" alt="loading" height={100} width={100} />;
}
