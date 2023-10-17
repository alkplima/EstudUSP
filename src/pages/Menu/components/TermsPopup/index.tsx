import { useState } from "react";
import { Button } from "../../../../components/Button/styles";
import { TermsPopupButtons, TermsPopupContainer, TermsPopupContent } from "./styles";

interface TermsPopupProps {
  setOpen: (open: boolean) => void;
}

export function TermsPopup({ setOpen }: TermsPopupProps) {
  const [isChecked, setIsChecked] = useState(false);

  function handleConfirmTermsPopup() {
    localStorage.setItem('termsPopupState', 'closed');
    setOpen(false);
  }

  return (
    <TermsPopupContainer>
      <TermsPopupContent>
        <h4>Termos e condições</h4>
        <div>
          <p>Lorem ipsum dolor sit amet consectetur. Felis nibh egestas et quis tortor at pharetra. Enim ornare augue risus sit. Porttitor purus magna ipsum ornare nibh feugiat faucibus. Vulputate sapien euismod quisque sed mauris ut. Proin scelerisque tortor phasellus ante purus posuere tellus. Urna arcu mauris volutpat hac feugiat suspendisse mi dui. Pellentesque posuere porta facilisis bibendum. Ultrices aliquam tempor praesent enim enim id. Non ullamcorper magna integer pulvinar.</p>
        </div>
      </TermsPopupContent>
      <TermsPopupButtons>
        <div>
          <div className="checkbox">
            <input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)}/>
          </div>
          <p>Li e concordo</p>
        </div>
        <Button onClick={handleConfirmTermsPopup} disabled={!isChecked}>
          Confirmar
        </Button>
      </TermsPopupButtons>
    </TermsPopupContainer>
  )
}