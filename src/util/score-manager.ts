export class ScoreManager {
  private static key = 'score-value';
  public static score = 0;

  public static update(score = ScoreManager.score): void {
    ScoreManager.score = score;
    ScoreManager.writeScore();
  }

  public static reset(): void {
    ScoreManager.score = 0;
  }

  private static writeScore(): void {
    document.querySelectorAll<HTMLElement>(`[data-${ScoreManager.key}]`)
      .forEach(element => element.innerText = ScoreManager.score.toString());
  }
}