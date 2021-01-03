export interface Dialog {
  type: DialogType,
  onOpen: <T extends HTMLElement>(element: T) => any,
  onInit: <T extends HTMLElement>(element: T, ...args: any[]) => any,
}

export enum DialogType {
  GAMEOVER = 'ui-gameover',
}

export class DialogManager {
  private static dialogs: Dialog[] = [];

  public static addDialog(...dialog: Dialog[]): void {
    DialogManager.dialogs = [...DialogManager.dialogs, ...dialog];
  }

  public static openDialog(type: DialogType): void {
    const { dialog, element } = DialogManager.getDialog(type);
    if (!dialog || !element) return;

    element.classList.add('active');
    dialog.onOpen?.(element);
  }

  public static closeDialog(type: DialogType): void {
    const { dialog, element } = DialogManager.getDialog(type);
    if (!dialog || !element) return;

    element.classList.remove('active');
  }

  public static initDialog(type: DialogType, ...args: any[]): void {
    const { dialog, element } = DialogManager.getDialog(type);
    if (!dialog || !element) return;

    dialog.onInit?.(element, ...args);
  }

  private static getDialog(type: DialogType): { dialog: Dialog | null, element: HTMLElement | null } {
    const dialog = DialogManager.dialogs.find(d => d.type === type) ?? null;
    const element = document.querySelector<HTMLElement>(`[data-${dialog?.type}]`) ?? null;
    return { dialog, element };
  }

}