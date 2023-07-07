import { sendEmail } from '@/service/email';
import * as yup from 'yup';

const bodyShhema = yup.object().shape({
  from: yup.string().email().required(),
  subject: yup.string().required(),
  message: yup.string().required(),
});

export async function POST(req: Request) {
  const body = await req.json();

  if (!bodyShhema.isValidSync(body)) {
    return new Response(JSON.stringify({ message: '메일 전송에 실패했습니다' }), { status: 400 });
  }

  return sendEmail(body)
    .then(() => new Response(JSON.stringify({ message: '메일을 성공적으로 보냈음.' }), { status: 200 }))
    .catch((error) => {
      console.error(error);
      return new Response(JSON.stringify({ message: '메일 전송에 실패했습니다' }), { status: 500 });
    });
}
