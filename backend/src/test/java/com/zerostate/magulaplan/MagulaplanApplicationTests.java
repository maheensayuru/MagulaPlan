package com.zerostate.magulaplan;

import org.junit.jupiter.api.Test;

/**
 * Smoke test for the Magulaplan application.
 * A full @SpringBootTest context load is omitted here because it requires a live
 * MySQL connection (production datasource). Individual module tests use @DataJpaTest
 * with H2 or @WebMvcTest for slice-level coverage.
 */
class MagulaplanApplicationTests {

    @Test
    void smokeTest() {
        // Intentionally empty — verifies the test infrastructure (JUnit + classpath) works.
    }

}
