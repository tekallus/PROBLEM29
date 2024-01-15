import { EnvelopeIcon } from "@heroicons/react/20/solid";
import { useReducer } from "react";
//2 useReducer tarafindan cagrilan reducer fonksiyonu:
//
function reducer(state, action) {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload,isError: false };
    case "INVITE_SENT":
      if (state.emails.includes(state.email) || !state.email.trim()) {
        // Eğer e-posta zaten varsa veya boşsa, hata durumunu işaretle
        return { ...state, isError: true };
      }
      return { ...state, emails: [...state.emails, state.email], email: "", isError: false };
    default:
      return state;
  }
}
export default function InviteUsers() {
  const [state, dispatch] = useReducer(reducer, {
    email: "",
    emails: []
  }); //1 baslangic durumuna iki ozellik tanimladigimiz useReducer hook u

  const handleSubmit = (e) => {
    e.preventDefault();
    //4) e.preventDefault() çağrısı yapılarak tarayıcının varsayılan form gönderme davranışı engellenir.
    //Bu sayede sayfa yenilenmez ve form, JavaScript tarafından yönetilen işlemleri gerçekleştirebilir.

    dispatch({ type: "INVITE_SENT" });
  }; //useReducer hook'u ile yönetilen state'i güncellemek için dispatch fonksiyonunu kullanır.
  return (
    <div className="mx-auto p-8 max-w-lg">
      <div>
        <Header isInviteSent={state.isInviteSent} />
        <form className="mt-6 flex" onSubmit={handleSubmit}>
          <label htmlFor="email" className="sr-only">
            E-mail adresiniz
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={state.email} //3 form elemanlarina state ve dispatch baglama
            onChange={(
              e // kullanici email girdiginde yapilacak islem
            ) => dispatch({ type: "SET_EMAIL", payload: e.target.value })}
            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="E-posta giriniz"
          />
          <button
            type="submit"
            className="ml-4 flex-shrink-0 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Davetiye gönderin
          </button>
        </form>
      </div>

      <div className="mt-10">
        {state.emails.map((email, index) => (
          <h3 key={index} className="text-sm font-medium text-gray-500">
            Ekip üyesi <span className="text-indigo-500">{email}</span> eklendi!
          </h3>
        ))}
      </div>
    </div>
  );
}

function Header({ isInviteSent }) {
  if (isInviteSent) {
    return null;
  }
  return (
    <div className="text-center">
      <EnvelopeIcon className="mx-auto h-12 w-12 text-gray-400" />
      <h2 className="mt-2 text-base font-semibold leading-6 text-gray-900">
        Ekip üyelerini davet edin
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        Projenize henüz herhangi bir ekip üyesi eklemediniz. Projenin sahibi
        olarak, ekip üyesi izinlerini yönetebilirsiniz.
      </p>
    </div>
  );
}
