import React from "react";
import { yearsInterval } from "../utils/constants";

const LimitationSection = (): JSX.Element => {
  return (
    <>
      <h2>Assumptions and limitations</h2>
      <p>
        This estimator introduces many assumptions that are inaccurate and may
        be completely wrong.
      </p>
      <ul>
        <li>
          This tool assumes that you work on a approach to AGI Safety that you
          are not the only pursuing.
        </li>
        <li>
          This tool assumes that what happens after 2100 is irrelevant (AGI
          Safety can't be solved beyond this point, and AGI can't be developed
          either).
        </li>
        <li>
          This tool assumes that progress on AGI and progress on AGI Safety are
          independent. This is obviously false and might have a large impact on
          the final result.
        </li>
        <li>
          This tool assumes that you speed up AI Safety progress at a constant
          rate throughout the century. This is widely inaccurate if you don't
          expect to work on the problem the whole time.
        </li>
        <li>
          This tool assumes that you speed up AI Safety progress with no
          uncertainty. This is widely inaccurate if you engage in actions with a
          high variance in outcome and that you are a significant player in your
          approach.
        </li>
        <li>
          This tool assumes that you speed up AI Safety progress without ever
          slowing down progress in other approaches of AGI Safety. This might be
          wrong if you promote your approach to AGI Safety at the expense of
          others.
        </li>
        <li>This tool mainly focuses on technical.</li>
        <li>
          There might be a bug somewhere. If the results seem completely wrong,
          it may be that I screwed up. (As of now, there isn't a lot of tests to
          check that I did everything correctly. Please tell me if you want to
          use this tool to make any significant decision so that I improve its
          robustness.)
        </li>
        <li>
          [Many more incorrect assumptions... Feel free to add the by doing a
          pull request.]
        </li>
        <li>
          The results won't be more precise than the input. Please make
          experiments with lower and higher estimation for each parameters if
          you want to have an idea of the uncertainties at play.
        </li>
      </ul>
      <p>
        Please tell me which of the limitations are the ones that would be the
        most useful fixing.
      </p>
      <p>
        This tool also lacks the possibility to share a parameter setup. Tell me
        if that could be very important to you.
      </p>
      <p>Details:</p>
      <ul>
        <li>
          If AI Safety is solved on the same year as rogue AGI appears, humanity
          is considered doomed. In practice, this doesn't make much a difference
          to the results.
        </li>
        <li>
          Years are taken in batches of {yearsInterval}. The probability in each
          square is the probability that the event happens within this{" "}
          {yearsInterval}-year window, starting at the displayed year.
        </li>
      </ul>
    </>
  );
};

export default LimitationSection;
